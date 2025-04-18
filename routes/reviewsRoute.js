const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviewsController");

router.post("/add", reviewsController.submitReview);

module.exports = router;
