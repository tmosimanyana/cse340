const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  return jwt.sign({ 
    account_id: user.account_id, 
    first_name: user.first_name, 
    account_type: user.account_type 
  }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
