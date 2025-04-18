const reviewModel = require("../models/reviewsModel");
const inventoryModel = require("../models/inventoryModel");

async function showVehicleDetail(req, res) {
  const vehicleId = req.params.id;
  try {
    const vehicle = await inventoryModel.getVehicleById(vehicleId);
    const reviews = await reviewModel.getReviewsByVehicleId(vehicleId);
    res.render("inventory/vehicle-detail", {
      title: `${vehicle.make} ${vehicle.model}`,
      vehicle,
      reviews,
      errors: null,
      input: {}
    });
  } catch (error) {
    res.status(500).render("error", { message: "Vehicle not found." });
  }
}

async function submitReview(req, res) {
  const { vehicle_id, reviewer_name, rating, review_text } = req.body;
  const errors = [];

  if (!reviewer_name || !review_text || !rating) {
    errors.push("All fields are required.");
  }

  if (rating < 1 || rating > 5) {
    errors.push("Rating must be between 1 and 5.");
  }

  try {
    const vehicle = await inventoryModel.getVehicleById(vehicle_id);
    const reviews = await reviewModel.getReviewsByVehicleId(vehicle_id);

    if (errors.length) {
      return res.render("inventory/vehicle-detail", {
        title: `${vehicle.make} ${vehicle.model}`,
        vehicle,
        reviews,
        errors,
        input: { reviewer_name, rating, review_text }
      });
    }

    await reviewModel.addReview(vehicle_id, reviewer_name, rating, review_text);
    res.redirect(`/inventory/detail/${vehicle_id}`);
  } catch (error) {
    res.status(500).render("error", { message: "Error submitting review." });
  }
}

module.exports = { showVehicleDetail, submitReview };
