const inventoryModel = require('../models/inventoryModel');
const utilities = require('../utilities');

// Home Page
exports.getHomePage = async (req, res, next) => {
  try {
    const vehicles = await inventoryModel.getAllVehicles(); // assuming async
    const nav = await utilities.getNav();
    res.render('index', {
      title: 'Home',
      nav,
      vehicles
    });
  } catch (err) {
    next(err);
  }
};

// Vehicle Detail Page
exports.getVehicleDetail = async (req, res, next) => {
  try {
    const vehicleId = parseInt(req.params.id, 10);
    const vehicle = await inventoryModel.getVehicleById(vehicleId); // async
    const nav = await utilities.getNav();

    if (vehicle) {
      const formattedPrice = utilities.formatPrice(vehicle.price);
      const formattedMileage = utilities.formatMileage(vehicle.mileage);
      res.render('vehicleDetail', {
        title: `${vehicle.make} ${vehicle.model}`,
        nav,
        vehicle,
        formattedPrice,
        formattedMileage
      });
    } else {
      res.status(404).render('404', { title: 'Vehicle Not Found', nav });
    }
  } catch (err) {
    next(err);
  }
};
