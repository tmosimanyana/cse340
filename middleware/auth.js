const checkLogin = (req, res, next) => {
  if (!req.session.user) {
    req.flash("errors", "You must be logged in.");
    return res.redirect("/account/login");
  }
  next();
};

module.exports = { checkLogin };
