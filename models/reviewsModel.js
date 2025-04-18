const pool = require("../database/");

async function getReviewsByVehicleId(vehicleId) {
  try {
    const result = await pool.query(
      "SELECT * FROM reviews WHERE vehicle_id = $1 ORDER BY created_at DESC",
      [vehicleId]
    );
    return result.rows;
  } catch (error) {
    throw new Error("Database error while retrieving reviews.");
  }
}

async function addReview(vehicleId, reviewerName, rating, reviewText) {
  try {
    const result = await pool.query(
      `INSERT INTO reviews (vehicle_id, reviewer_name, rating, review_text)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [vehicleId, reviewerName, rating, reviewText]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Database error while adding review.");
  }
}

module.exports = { getReviewsByVehicleId, addReview };
