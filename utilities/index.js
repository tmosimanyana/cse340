function buildVehicleDetailHtml(vehicle) {
    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(vehicle.inv_price);
    const formattedMiles = new Intl.NumberFormat("en-US").format(vehicle.inv_miles);
  
    return `
      <div class="vehicle-detail">
        <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
        <h2>${vehicle.inv_make} ${vehicle.inv_model} Details</h2>
        <ul>
          <li><strong>Price:</strong> ${formattedPrice}</li>
          <li><strong>Mileage:</strong> ${formattedMiles} miles</li>
          <li><strong>Description:</strong> ${vehicle.inv_description}</li>
          <li><strong>Color:</strong> ${vehicle.inv_color}</li>
        </ul>
      </div>`;
  }
  