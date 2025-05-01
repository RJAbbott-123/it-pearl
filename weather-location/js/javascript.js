// Get elements from the DOM
const locationForm = document.getElementById('locationForm');
const locationInput = document.getElementById('locationInput');
const messageDiv = document.getElementById('message');
const locationInfoDiv = document.getElementById('location-info');
const forecastTableBody = document.querySelector('#forecastTable tbody');
const forecastChartCanvas = document.getElementById('forecastChart');
let forecastChart;

// When the form is submitted, validate and process the input.
locationForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const locationQuery = locationInput.value.trim();

  if (!locationQuery) {
    messageDiv.textContent = 'Location is required.';
    return;
  }

  // Clear previous messages and forecast data.
  messageDiv.textContent = '';
  locationInfoDiv.innerHTML = '';
  forecastTableBody.innerHTML = '';
  if (forecastChart) {
    forecastChart.destroy();
  }

  // Check if the input equals the default location (Devil's Den State Park)
  if (locationQuery.toLowerCase() === "devil's den state park") {
    locationInfoDiv.innerHTML = '<div class="info-item"><strong>Forecast for Devil\'s Den State Park</strong></div>';
    loadDefaultForecast();
  } else {
    // Use geocoding API if input is anything other than the default.
    getGeocoding(locationQuery);
  }
});

// Function to load the default forecast using the provided API
function loadDefaultForecast() {
  const defaultAPI = 'https://api.open-meteo.com/v1/forecast?latitude=35.7806&longitude=-94.2516&hourly=temperature_2m&temperature_unit=fahrenheit';
  
  fetch(defaultAPI)
    .then(response => response.json())
    .then(data => {
      if (!data.hourly || !data.hourly.time || !data.hourly.temperature_2m) {
        messageDiv.textContent = 'No forecast data available from the default API.';
        return;
      }
      displayForecast(data.hourly.time, data.hourly.temperature_2m);
    })
    .catch(error => {
      messageDiv.textContent = 'Error fetching default forecast data.';
      console.error('Default forecast error:', error);
    });
}

// Use the geocoding API to search for a location.
function getGeocoding(query) {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1`;

  fetch(geoUrl)
    .then(response => response.json())
    .then(data => {
      if (!data.results || data.results.length === 0) {
        messageDiv.textContent = 'No matching location found. Please try another location.';
        return;
      }
      const loc = data.results[0];
      displayLocationInfo(loc);
      getForecast(loc.latitude, loc.longitude);
    })
    .catch(error => {
      messageDiv.textContent = 'Error fetching location data.';
      console.error('Geocoding error:', error);
    });
}

// Display location details on the page.
function displayLocationInfo(loc) {
  const infoHTML = `
    <div class="info-item"><strong>Name:</strong> ${loc.name}</div>
    <div class="info-item"><strong>Admin1:</strong> ${loc.admin1 || 'N/A'}</div>
    <div class="info-item"><strong>Country:</strong> ${loc.country}</div>
    <div class="info-item"><strong>Latitude:</strong> ${loc.latitude}</div>
    <div class="info-item"><strong>Longitude:</strong> ${loc.longitude}</div>
  `;
  locationInfoDiv.innerHTML = infoHTML;
}

// Retrieves the forecast data using the forecast API for dynamic locations.
function getForecast(lat, lon) {
  // Adjust parameters as needed.
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&temperature_unit=fahrenheit&forecast_days=7&timezone=auto`;

  fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
      if (!data.hourly || !data.hourly.time || !data.hourly.temperature_2m) {
        messageDiv.textContent = 'No forecast data available.';
        return;
      }
      displayForecast(data.hourly.time, data.hourly.temperature_2m);
    })
    .catch(error => {
      messageDiv.textContent = 'Error fetching forecast data.';
      console.error('Forecast error:', error);
    });
}

// Display both the table and the line chart with the forecast data.
function displayForecast(times, temperatures) {
  // Convert ISO time strings into a more readable format.
  const formattedTimes = times.map(t => {
    let unixMilliseconds = Date.parse(t);
    let tmpDate = new Date(unixMilliseconds);
    return tmpDate.toLocaleString();
  });

  // Populate the table.
  formattedTimes.forEach((time, index) => {
    const row = document.createElement('tr');

    const timeCell = document.createElement('td');
    timeCell.textContent = time;
    row.appendChild(timeCell);

    const tempCell = document.createElement('td');
    tempCell.textContent = temperatures[index] + '°F';
    row.appendChild(tempCell);

    forecastTableBody.appendChild(row);
  });

  // Create a line chart using Chart.js.
  const ctx = forecastChartCanvas.getContext('2d');
  forecastChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: formattedTimes,
      datasets: [
        {
          label: 'Temperature (°F)',
          data: temperatures,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          fill: true,
          tension: 0.2,
          pointRadius: 3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        x: {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
          },
        },
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Temperature (°F)',
          },
        },
      },
    },
  });
}
