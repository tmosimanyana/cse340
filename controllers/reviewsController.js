const reviewModel = require("../models/reviewsModel")

async function getVehicleReviews(req, res, next) {
  const { vehicleId } = req.params
  try {
    const reviews = await reviewModel.getReviewsByVehicleId(vehicleId)
    res.locals.reviews = reviews
    next() // move to next middleware like rendering the vehicle detail page
  } catch (error) {
    next(error)
  }
}

async function postNewReview(req, res, next) {
  const { vehicleId, reviewerName, rating, reviewText } = req.body
  try {
    await reviewModel.addReview(vehicleId, reviewerName, rating, reviewText)
    res.redirect(`/inventory/detail/${vehicleId}`) // redirect back to vehicle page
  } catch (error) {
    next(error)
  }
}

module.exports = { getVehicleReviews, postNewReview }
