// Format values used by the server-rendered vehicle detail page.
function formatPrice(price) {
  const amount = Number(price);
  if (!Number.isFinite(amount)) {
    return 'Price unavailable';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

function formatMileage(mileage) {
  const value = Number(mileage);
  if (!Number.isFinite(value)) {
    return 'Mileage unavailable';
  }

  return new Intl.NumberFormat('en-US').format(value) + ' miles';
}

module.exports = {
  formatPrice,
  formatMileage
};
