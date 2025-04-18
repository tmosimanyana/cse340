const vehicles = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    price: 25000,
    mileage: 15000,
    description: 'A reliable sedan with excellent fuel economy.',
    image: '/images/toyota-camry.jpg',
  },
  // You can add more vehicles here
];

exports.getAllVehicles = () => vehicles;

exports.getVehicleById = (id) => vehicles.find((vehicle) => vehicle.id === id);
