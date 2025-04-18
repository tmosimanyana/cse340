const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT
exports.authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user;  // Attach user info to request
      next();
    });
  } else {
    res.sendStatus(401);  // Unauthorized
  }
};

// Middleware to authorize user based on role
exports.authorizeRole = (roles) => (req, res, next) => {
  if (roles.includes(req.user.account_type)) {
    next();
  } else {
    res.redirect('/account/login');
  }
};
