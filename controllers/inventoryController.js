const inventoryModel = require('../models/inventoryModel')
const utilities = require('../utilities')

exports.getHomePage = async (req, res, next) => {
  try {
    const vehicles = await inventoryModel.getAllVehicles()
    res.render('index', { title: 'Home', vehicles })
  } catch (error) {
    next(error)
  }
}

exports.getVehicleDetail = async (req, res, next) => {
  try {
    const vehicleId = parseInt(req.params.id, 10)
    const vehicle = await inventoryModel.getVehicleById(vehicleId)
    if (vehicle) {
      const formattedPrice = utilities.formatPrice(vehicle.price)
      const formattedMileage = utilities.formatMileage(vehicle.mileage)
      res.render('vehicleDetail', {
        title: `${vehicle.make} ${vehicle.model}`,
        vehicle,
        formattedPrice,
        formattedMileage
      })
    } else {
      res.status(404).render('404', { title: 'Vehicle Not Found' })
    }
  } catch (error) {
    next(error)
  }
}
