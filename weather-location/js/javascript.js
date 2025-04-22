async function fetchWeather() {
    const location = document.getElementById('location').value.trim();
    const errorMessage = document.getElementById('errorMessage');
    const forecastTable = document.getElementById('forecastTable');
    const temperatureChart = document.getElementById('temperatureChart');
    
    errorMessage.innerHTML = '';
    forecastTable.innerHTML = '';
  
    if (!location) {
      errorMessage.innerHTML = 'Location is required!';
      return;
    }
  
    try {
      const geocodeResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}`);
      const geocodeData = await geocodeResponse.json();
  
      if (!geocodeData.results || geocodeData.results.length === 0) {
        errorMessage.innerHTML = 'No location found!';
        return;
      }
  
      const { latitude, longitude } = geocodeData.results[0];
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&temperature_unit=fahrenheit`);
      const weatherData = await weatherResponse.json();
  
      const { time, temperature_2m } = weatherData.hourly;
      const tableRows = time.map((t, i) => {
        const formattedTime = new Date(Date.parse(t)).toLocaleString();
        return `<tr><td>${formattedTime}</td><td>${temperature_2m[i]}</td></tr>`;
      }).join('');
  
      forecastTable.innerHTML = `
        <table>
          <thead>
            <tr><th>Date</th><th>Temperature (°F)</th></tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      `;
  
      drawChart(time, temperature_2m);
    } catch (error) {
      errorMessage.innerHTML = 'Error fetching data!';
    }
  }
  
  function drawChart(time, temperatures) {
    const ctx = document.getElementById('temperatureChart').getContext('2d');
    const formattedTimes = time.map(t => new Date(Date.parse(t)).toLocaleString());
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: formattedTimes,
        datasets: [{
          label: 'Temperature (°F)',
          data: temperatures,
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'hour'
            }
          }
        }
      }
    });
  }
  