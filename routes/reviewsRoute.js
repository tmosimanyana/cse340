const express = require("express")
const router = express.Router()
const reviewController = require("../controllers/reviewsController")

// POST route for submitting a review
router.post("/add", reviewController.postNewReview)

module.exports = router
