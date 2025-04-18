// routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Home Page
router.get('/', inventoryController.getHomePage);

// Vehicle Detail Page
router.get('/vehicle/:id', inventoryController.getVehicleDetail);

module.exports = router;
