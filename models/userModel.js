// ============================================================================
// 2. UPDATE: models/userModel.js
// ============================================================================
const db = require('../database/index');

// Update user account details using prepared statements
exports.updateAccount = async (account_id, first_name, last_name, email) => {
  const query = 'UPDATE account SET account_firstname = $1, account_lastname = $2, account_email = $3 WHERE account_id = $4';
  return await db.none(query, [first_name, last_name, email, account_id]);
};

// Update user password using prepared statements
exports.updatePassword = async (account_id, hashedPassword) => {
  const query = 'UPDATE account SET account_password = $1 WHERE account_id = $2';
  return await db.none(query, [hashedPassword, account_id]);
};

// Find user by account_id using prepared statements
exports.findByAccountId = async (account_id) => {
  const query = 'SELECT * FROM account WHERE account_id = $1';
  return await db.oneOrNone(query, [account_id]);
};

// Find user by email using prepared statements
exports.findByEmail = async (email) => {
  const query = 'SELECT * FROM account WHERE account_email = $1';
  return await db.oneOrNone(query, [email]);
};
