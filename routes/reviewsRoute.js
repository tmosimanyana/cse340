const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

// Display reviews for a specific vehicle
router.get('/:vehicleId', reviewsController.showReviews);

// Add a new review for a specific vehicle
router.post('/:vehicleId', reviewsController.addReview);

module.exports = router;
