exports.formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  exports.formatMileage = (mileage) => {
    return `${mileage.toLocaleString('en-US')} miles`;
  };
  