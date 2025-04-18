exports.logout = (req, res) => {
    res.clearCookie('token');  // Clear the token cookie
    res.redirect('/');
  };
  