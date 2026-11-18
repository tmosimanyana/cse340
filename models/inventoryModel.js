const db = require('../database/index');

// Retrieve all vehicles for the inventory page.
exports.getAllVehicles = async () => {
  return db.any('SELECT * FROM inventory');
};

// Retrieve one vehicle. Return null when no matching record exists.
exports.getVehicleById = async (id) => {
  return db.oneOrNone('SELECT * FROM inventory WHERE vehicle_id = $1', [id]);
};

// Create a vehicle classification and return its generated ID.
exports.addClassification = async (classificationName) => {
  return db.one(
    'INSERT INTO classifications (classification_name) VALUES ($1) RETURNING classification_id',
    [classificationName],
    row => row.classification_id
  );
};

// Create a vehicle and return its generated ID.
exports.addVehicle = async (vehicleData) => {
  const { make, model, year, price, mileage, classification_id } = vehicleData;

  return db.one(
    `INSERT INTO inventory
      (make, model, year, price, mileage, classification_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING vehicle_id`,
    [make, model, year, price, mileage, classification_id],
    row => row.vehicle_id
  );
};

// Retrieve all available vehicle classifications.
exports.getClassifications = async () => {
  return db.any('SELECT * FROM classifications');
};
