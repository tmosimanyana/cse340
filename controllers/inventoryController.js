const inventoryModel = require('../models/inventoryModel');
const utilities = require('../utilities');

exports.getHomePage = (req, res) => {
  const vehicles = inventoryModel.getAllVehicles();
  res.render('index', { title: 'Home', vehicles });
};

exports.getVehicleDetail = (req, res) => {
  const vehicleId = parseInt(req.params.id, 10);
  const vehicle = inventoryModel.getVehicleById(vehicleId);
  if (vehicle) {
    const formattedPrice = utilities.formatPrice(vehicle.price);
    const formattedMileage = utilities.formatMileage(vehicle.mileage);
    res.render('vehicleDetail', {
      title: `${vehicle.make} ${vehicle.model}`,
      vehicle,
      formattedPrice,
      formattedMileage,
    });
  } else {
    res.status(404).render('404', { title: 'Vehicle Not Found' });
  }
};
