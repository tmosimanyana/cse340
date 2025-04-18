const db = require('../db');

// Get all vehicles
exports.getAllVehicles = async () => {
  try {
    return await db.any('SELECT * FROM inventory');
  } catch (err) {
    console.error('Error fetching all vehicles:', err);
    throw err;
  }
};

// Get vehicle by ID
exports.getVehicleById = async (id) => {
  try {
    return await db.oneOrNone('SELECT * FROM inventory WHERE vehicle_id = $1', [id]);
  } catch (err) {
    console.error(`Error fetching vehicle ID ${id}:`, err);
    throw err;
  }
};

// Add a classification
exports.addClassification = async (classificationName) => {
  try {
    const result = await db.one(
      'INSERT INTO classifications (classification_name) VALUES ($1) RETURNING classification_id',
      [classificationName]
    );
    return result.classification_id;
  } catch (err) {
    console.error('Error adding classification:', err);
    throw err;
  }
};

// Add a vehicle
exports.addVehicle = async (vehicleData) => {
  const { make, model, year, price, mileage, classification_id } = vehicleData;

  try {
    const result = await db.one(
      `INSERT INTO inventory (make, model, year, price, mileage, classification_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING vehicle_id`,
      [make, model, year, price, mileage, classification_id]
    );
    return result.vehicle_id;
  } catch (err) {
    console.error('Error adding vehicle:', err);
    throw err;
  }
};

// Get all classifications
exports.getClassifications = async () => {
  try {
    return await db.any('SELECT * FROM classifications');
  } catch (err) {
    console.error('Error fetching classifications:', err);
    throw err;
  }
};
