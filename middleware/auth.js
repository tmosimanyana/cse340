// ============================================================================
// 4. UPDATE: middleware/auth.js
// ============================================================================
const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
  if (!req.session.user) {
    req.flash("errors", "You must be logged in.");
    return res.redirect("/account/login");
  }
  next();
};

const verifyJWT = (req, res, next) => {
  const token = req.cookies.jwt || req.session.user?.token;
  
  if (!token) {
    req.flash("errors", "Authentication required.");
    return res.redirect("/account/login");
  }
  
  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    req.flash("errors", "Invalid session. Please log in again.");
    res.redirect("/account/login");
  }
};

const checkAccountType = (allowedTypes) => {
  return (req, res, next) => {
    const userType = req.session.user?.role;
    
    if (!allowedTypes.includes(userType)) {
      req.flash("errors", "Access denied.");
      return res.redirect("/account/login");
    }
    
    next();
  };
};

module.exports = { 
  checkLogin, 
  verifyJWT, 
  checkAccountType 
};

// ============================================================================
