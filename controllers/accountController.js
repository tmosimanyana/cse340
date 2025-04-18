const jwt = require('jsonwebtoken');
const User = require('../models/user');  // Assuming a User model exists

// Display account management view
exports.getAccountManagement = (req, res) => {
  if (req.user) {
    res.render('accountManagement', { user: req.user });
  } else {
    res.redirect('/account/login');
  }
};

// Update account information
exports.updateAccount = async (req, res) => {
  const { first_name, last_name, email, account_id } = req.body;

  try {
    const updatedUser = await User.updateAccount(account_id, first_name, last_name, email);
    res.redirect('/account/management');
  } catch (err) {
    res.render('accountUpdate', { user: req.user, error: 'Error updating account information.' });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  const { password, account_id } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updatePassword(account_id, hashedPassword);
    res.redirect('/account/management');
  } catch (err) {
    res.render('accountUpdate', { user: req.user, error: 'Error changing password.' });
  }
};
