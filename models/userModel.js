const db = require('../config/db');  // Assuming you're using some DB connection

// Update user account details
exports.updateAccount = (account_id, first_name, last_name, email) => {
  const query = 'UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE account_id = ?';
  return db.query(query, [first_name, last_name, email, account_id]);
};

// Update user password
exports.updatePassword = (account_id, hashedPassword) => {
  const query = 'UPDATE users SET password = ? WHERE account_id = ?';
  return db.query(query, [hashedPassword, account_id]);
};

// Find user by account_id
exports.findByAccountId = (account_id) => {
  const query = 'SELECT * FROM users WHERE account_id = ?';
  return db.query(query, [account_id]);
};
