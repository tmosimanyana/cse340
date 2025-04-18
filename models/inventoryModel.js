const db = require('../db');

exports.getAllVehicles = async () => {
  const result = await db.query('SELECT * FROM inventory');
  return result.rows;
};

exports.getVehicleById = async (id) => {
  const result = await db.query('SELECT * FROM inventory WHERE vehicle_id = $1', [id]);
  return result.rows[0];
};

exports.addClassification = async (classificationName) => {
  const result = await db.query(
    'INSERT INTO classifications (classification_name) VALUES ($1) RETURNING classification_id',
    [classificationName]
  );
  return result.rows[0].classification_id;
};

exports.addVehicle = async (vehicleData) => {
  const { make, model, year, price, mileage, classification_id } = vehicleData;
  const result = await db.query(
    'INSERT INTO inventory (make, model, year, price, mileage, classification_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING vehicle_id',
    [make, model, year, price, mileage, classification_id]
  );
  return result.rows[0].vehicle_id;
};

exports.getClassifications = async () => {
  const result = await db.query('SELECT * FROM classifications');
  return result.rows;
};
