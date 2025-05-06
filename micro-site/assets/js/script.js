document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  document.querySelectorAll('.toggle-article').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentElement.nextElementSibling.classList.toggle('article-content');
      this.parentElement.nextElementSibling.style.display = this.parentElement.nextElementSibling.style.display === 'none' ? 'block' : 'none';
    });
  });

  document.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.classList.toggle("scrolled", window.scrollY > 50);
});
/*
async function fetchWeather() {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=35.1173&longitude=-92.9377&daily=sunrise,sunset,uv_index_max&hourly=temperature_2m,rain,relative_humidity_2m,snowfall,cloud_cover,wind_speed_10m&current=temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature,precipitation,rain,cloud_cover&timezone=America%2FChicago&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch";
  
  try {
      const response = await fetch(url);
      const data = await response.json();

      document.getElementById("current-weather").innerHTML = `
          <p>Temperature: ${data.current.temperature_2m}°F</p>
          <p>Wind Speed: ${data.current.wind_speed_10m} mph</p>
          <p>Humidity: ${data.current.relative_humidity_2m}%</p>
          <p>Cloud Cover: ${data.current.cloud_cover}%</p>
      `;

      document.getElementById("daily-forecast").innerHTML = `
          <p>Sunrise: ${data.daily.sunrise[0]}</p>
          <p>Sunset: ${data.daily.sunset[0]}</p>
          <p>Max UV Index: ${data.daily.uv_index_max[0]}</p>
      `;

      let hourlyHTML = "";
      for (let i = 0; i < data.hourly.temperature_2m.length; i += 6) {
          hourlyHTML += `<p>${i}:00 - Temp: ${data.hourly.temperature_2m[i]}°F, Cloud Cover: ${data.hourly.cloud_cover[i]}%</p>`;
      }
      document.getElementById("hourly-forecast").innerHTML = hourlyHTML;
  } catch (error) {
      console.error("Error fetching weather data:", error);
  }
}
*/
document.addEventListener("DOMContentLoaded", fetchWeather);

async function fetchWeather() {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=35.1173&longitude=-92.9377&daily=sunrise,sunset,uv_index_max&hourly=temperature_2m,rain,relative_humidity_2m,snowfall,cloud_cover,wind_speed_10m&current=temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature,precipitation,rain,cloud_cover&timezone=America%2FChicago&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch";
  
  try {
      const response = await fetch(url);
      const data = await response.json();

      document.getElementById("current-weather").innerHTML = `
          <h3>🌡️ Temperature: ${data.current.temperature_2m}°F</h3>
          <p>💨 Wind Speed: ${data.current.wind_speed_10m} mph</p>
          <p>💦 Humidity: ${data.current.relative_humidity_2m}%</p>
          <p>☁️ Cloud Cover: ${data.current.cloud_cover}%</p>
          <p>🌧️ Rain: ${data.current.rain} inches</p>
      `;

      document.getElementById("daily-forecast").innerHTML = `
          <h3>🌅 Sunrise: ${data.daily.sunrise[0]}</h3>
          <h3>🌇 Sunset: ${data.daily.sunset[0]}</h3>
          <h3>🔆 Max UV Index: ${data.daily.uv_index_max[0]}</h3>
      `;

      let hourlyHTML = `<table class="weather-table"><thead><tr><th>Time</th><th>Temp</th><th>Clouds</th><th>Rain</th></tr></thead><tbody>`;
      const hours = [0, 3, 6, 9, 12, 15, 18, 21]; // Selected times

      hours.forEach(hour => {
          let period = hour === 0 ? "12 AM" : hour === 12 ? "12 PM" : hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
          hourlyHTML += `
              <tr>
                  <td>${period}</td>
                  <td>${data.hourly.temperature_2m[hour]}°F</td>
                  <td>${data.hourly.cloud_cover[hour]}%</td>
                  <td>${data.hourly.rain[hour]} inches</td>
              </tr>
          `;
      });

      hourlyHTML += `</tbody></table>`;
      document.getElementById("hourly-forecast").innerHTML = hourlyHTML;
  } catch (error) {
      console.error("Error fetching weather data:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchWeather);