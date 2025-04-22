function fetchCurrencyData() {
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;
  
    const apiKey = "YOUR_API_KEY"; // Replace with your Polygon.io API key
    const url = "https://api.polygon.io/v2/aggs/ticker/C:${fromCurrency}${toCurrency}/range/1/day/${fromDate}/${toDate}?apiKey=${apiKey}";
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Pass the data to a function to render the chart
        renderChart(data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }
  
  function renderChart(data) {
    const ctx = document.getElementById("currencyChart").getContext("2d");
    const labels = data.results.map(entry => entry.t); // Example: dates
    const values = data.results.map(entry => entry.c); // Example: closing prices
  
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Currency Value",
          data: values,
          borderColor: "blue",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: "Date" } },
          y: { title: { display: true, text: "Value" } }
        }
      }
    });
  }
  