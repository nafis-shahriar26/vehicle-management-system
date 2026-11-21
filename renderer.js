// Sample vehicles for the project.
// These are kept here so no separate vehicle JSON file is needed.
const vehicles = [
  {
    id: 1,
    name: "Toyota Axio",
    type: "Car",
    passengers: 4,
    fuel: "Petrol",
    pricePerDay: 4500,
    icon: "🚗"
  },
  {
    id: 2,
    name: "Toyota Allion",
    type: "Car",
    passengers: 4,
    fuel: "Petrol",
    pricePerDay: 5000,
    icon: "🚘"
  },
  {
    id: 3,
    name: "Honda Grace Hybrid",
    type: "Car",
    passengers: 4,
    fuel: "Hybrid",
    pricePerDay: 6000,
    icon: "🚙"
  },
  {
    id: 4,
    name: "Toyota Noah",
    type: "Microbus",
    passengers: 7,
    fuel: "Petrol",
    pricePerDay: 8000,
    icon: "🚐"
  }
];

const vehicleList = document.getElementById("vehicle-list");
const vehicleChoice = document.getElementById("vehicle-choice");
const bookingForm = document.getElementById("booking-form");
const bookingMessage = document.getElementById("booking-message");

function showVehicles() {
  vehicles.forEach(function (vehicle) {
    const card = document.createElement("article");
    card.className = "vehicle-card";

    card.innerHTML = `
      <div class="vehicle-icon">${vehicle.icon}</div>
      <div class="vehicle-info">
        <h3>${vehicle.name}</h3>
        <p>${vehicle.type} · ${vehicle.passengers} passengers · ${vehicle.fuel}</p>
        <p class="price">৳${vehicle.pricePerDay.toLocaleString()} / day</p>
        <button class="button" type="button" data-vehicle-id="${vehicle.id}">
          Book this vehicle
        </button>
      </div>
    `;

    vehicleList.appendChild(card);

    const option = document.createElement("option");
    option.value = vehicle.id;
    option.textContent = vehicle.name;
    vehicleChoice.appendChild(option);
  });
}

vehicleList.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-vehicle-id]");

  if (button) {
    vehicleChoice.value = button.dataset.vehicleId;
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
  }
});

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const vehicleId = Number(vehicleChoice.value);
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  const selectedVehicle = vehicles.find(function (vehicle) {
    return vehicle.id === vehicleId;
  });

  if (!selectedVehicle) {
    bookingMessage.textContent = "Please choose a vehicle.";
    return;
  }

  if (endDate < startDate) {
    bookingMessage.textContent = "Return date must be after pickup date.";
    return;
  }

  const booking = {
    name: name,
    phone: phone,
    vehicle: selectedVehicle.name,
    startDate: startDate,
    endDate: endDate,
    requestedAt: new Date().toISOString()
  };

  const savedBookings =
    JSON.parse(localStorage.getItem("rentalBookings")) || [];

  savedBookings.push(booking);
  localStorage.setItem("rentalBookings", JSON.stringify(savedBookings));

  bookingMessage.textContent =
    `Thanks, ${name}! Your request for the ${selectedVehicle.name} was saved.`;

  bookingForm.reset();
});

showVehicles();