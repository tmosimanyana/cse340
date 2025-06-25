// ============================================================================
// 1. UPDATE: controllers/accountController.js
// ============================================================================
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");

const buildLogin = (req, res) => {
  res.render("account/login", { title: "Login" });
};

const loginAccount = async (req, res) => {
  const { email, password } = req.body;

  try {
    // In a real app, you'd verify against database
    const user = await userModel.findByEmail(email);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { 
          account_id: user.account_id,
          email: user.email, 
          role: user.account_type,
          first_name: user.first_name,
          last_name: user.last_name
        }, 
        process.env.SESSION_SECRET,
        { expiresIn: '1h' }
      );
      
      req.session.user = { 
        account_id: user.account_id,
        email: user.email, 
        role: user.account_type,
        first_name: user.first_name,
        last_name: user.last_name,
        token 
      };
      
      // Set JWT cookie
      res.cookie('jwt', token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000 // 1 hour
      });
      
      res.redirect("/account/management");
    } else {
      req.flash("errors", "Invalid credentials");
      res.redirect("/account/login");
    }
  } catch (error) {
    req.flash("errors", "Login failed. Please try again.");
    res.redirect("/account/login");
  }
};

const logoutAccount = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('jwt'); // Clear JWT cookie
    res.redirect("/");
  });
};

const buildAccountManagement = (req, res) => {
  const user = req.session.user;
  let greeting;
  
  if (user.role === "Admin") {
    greeting = "Welcome, Admin!";
  } else if (user.role === "Employee") {
    greeting = `Welcome, ${user.first_name}`;
  } else {
    greeting = `Welcome, ${user.first_name}`;
  }
  
  res.render("account/management", { 
    title: "Account Management", 
    greeting,
    user
  });
};

const buildAccountUpdate = (req, res) => {
  res.render("account/update", {
    title: "Update Account",
    user: req.session.user,
    errors: req.flash("errors"),
    message: req.flash("message")
  });
};

const updateAccount = async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array().map(error => error.msg));
    return res.redirect("/account/update");
  }

  const { first_name, last_name, email } = req.body;
  const account_id = req.session.user.account_id;

  try {
    await userModel.updateAccount(account_id, first_name, last_name, email);
    
    // Update session data
    req.session.user.first_name = first_name;
    req.session.user.last_name = last_name;
    req.session.user.email = email;
    
    req.flash("message", "Account updated successfully!");
    res.redirect("/account/management");
  } catch (error) {
    req.flash("errors", "Failed to update account. Please try again.");
    res.redirect("/account/update");
  }
};

const updatePassword = async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array().map(error => error.msg));
    return res.redirect("/account/update");
  }

  const { password } = req.body;
  const account_id = req.session.user.account_id;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    await userModel.updatePassword(account_id, hashedPassword);
    
    req.flash("message", "Password updated successfully!");
    res.redirect("/account/management");
  } catch (error) {
    req.flash("errors", "Failed to update password. Please try again.");
    res.redirect("/account/update");
  }
};

module.exports = {
  buildLogin,
  loginAccount,
  logoutAccount,
  buildAccountManagement,
  buildAccountUpdate,
  updateAccount,
  updatePassword
};
