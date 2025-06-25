const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const auth = require('../middleware/auth');

router.get('/login', accountController.buildLogin);
router.post('/login', accountController.loginAccount);
router.get('/logout', accountController.logoutAccount);
router.get('/management', auth.checkLogin, accountController.buildAccountManagement);

module.exports = router;
