const reviewsModel = require('../models/reviewsModel');

// Show reviews for a vehicle
const showReviews = async (req, res, next) => {
  try {
    const vehicleId = req.params.vehicleId;
    const reviews = await reviewsModel.getReviewsByVehicleId(vehicleId);
    res.render('reviews', { reviews, vehicleId });
  } catch (err) {
    next(err);
  }
};

// Add a new review
const addReview = async (req, res, next) => {
  const { vehicleId } = req.params;
  const { reviewerName, rating, reviewText } = req.body;

  // Validate input
  if (!reviewerName || !rating || rating < 1 || rating > 5) {
    return res.status(400).render('reviews', {
      error: 'Invalid input data. Please check the form fields.',
      vehicleId,
    });
  }

  try {
    const newReview = await reviewsModel.addReview(vehicleId, reviewerName, rating, reviewText);
    res.redirect(`/reviews/${vehicleId}`);  // Redirect to the vehicle's reviews page
  } catch (err) {
    next(err);
  }
};

module.exports = { showReviews, addReview };
