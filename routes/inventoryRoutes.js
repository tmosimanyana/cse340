const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Home Page
router.get('/', inventoryController.getHomePage);

// Vehicle Detail Page
router.get('/vehicle/:id', inventoryController.getVehicleDetail);

// Management View
router.get('/inv', inventoryController.getManagementView);

// Error Testing Route (for testing error handling)
router.get('/cause-error', (req, res, next) => {
    next(new Error("This is a test error"));
});

module.exports = router;
