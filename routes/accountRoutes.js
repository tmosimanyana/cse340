// ============================================================================
// 3. UPDATE: routes/accountRoutes.js
// ============================================================================
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const auth = require('../middleware/auth');
const { body } = require('express-validator');

// Validation rules
const accountValidation = [
  body('first_name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('First name is required'),
  body('last_name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Last name is required'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required')
];

const passwordValidation = [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
];

router.get('/login', accountController.buildLogin);
router.post('/login', accountController.loginAccount);
router.get('/logout', accountController.logoutAccount);
router.get('/management', auth.checkLogin, accountController.buildAccountManagement);
router.get('/update', auth.checkLogin, accountController.buildAccountUpdate);
router.post('/update', auth.checkLogin, accountValidation, accountController.updateAccount);
router.post('/update-password', auth.checkLogin, passwordValidation, accountController.updatePassword);

module.exports = router;
