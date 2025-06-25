const jwt = require("jsonwebtoken");

const buildLogin = (req, res) => {
  res.render("account/login", { title: "Login" });
};

const loginAccount = (req, res) => {
  const { email, password } = req.body;

  if (email === "client@example.com" && password === "password") {
    const token = jwt.sign({ email, role: "Client" }, process.env.SESSION_SECRET);
    req.session.user = { email, role: "Client", token };
    res.redirect("/account/management");
  } else {
    req.flash("errors", "Invalid credentials");
    res.redirect("/account/login");
  }
};

const logoutAccount = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

const buildAccountManagement = (req, res) => {
  const user = req.session.user;
  const greeting = user.role === "Admin" ? "Welcome, Admin!" : `Welcome, ${user.email}`;
  res.render("account/management", { title: "Account Management", greeting });
};

module.exports = {
  buildLogin,
  loginAccount,
  logoutAccount,
  buildAccountManagement
};
