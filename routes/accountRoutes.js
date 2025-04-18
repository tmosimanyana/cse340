const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { authenticateJWT } = require('../middleware/authMiddleware');  // Assuming JWT middleware exists

// Route to get account management view
router.get('/management', authenticateJWT, accountController.getAccountManagement);

// Route to handle account update
router.post('/update', authenticateJWT, accountController.updateAccount);

// Route to handle password change
router.post('/change-password', authenticateJWT, accountController.changePassword);

module.exports = router;
