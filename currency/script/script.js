async function getResults() {
  "use strict";

  // Get a reference to the form - Use the ID of the form
  var form = $("#myform");

  // Validate all elements
  form.validate();

  // If all form elements are valid, get the values
  if (form.valid()) {
    var apiKey = "QzjI5oFzJkL19c3AeJzJIHQtH1jEBgxY";
    var baseCurrency = document.getElementById("baseCurrency").value;
    var toCurrency = document.getElementById("toCurrency").value;
    var fromDate = document.getElementById("fromDate").value;
    var toDate = document.getElementById("toDate").value;

    // URL for AJAX call

    //https://api.polygon.io/v2/aggs/ticker/C:EURUSD/range/1/day/2023-01-09/2023-01-09?adjusted=true&sort=asc&limit=120&apiKey=QzjI5oFzJkL19c3AeJzJIHQtH1jEBgxY
    var myURL =
      "https://api.polygon.io/v2/aggs/ticker/C:" +
      baseCurrency +
      toCurrency +
      "/range/1/day/" +
      fromDate +
      "/" +
      toDate +
      "?adjusted=true&sort=asc&limit=120&apiKey=" +
      apiKey;

    var msg2Object = await fetch(myURL);
    /* Check the status */
    if (msg2Object.status >= 200 && msg2Object.status <= 299) {
      var msg2JSONText = await msg2Object.text();
      // Parse the JSON string into an object
      var msg2 = JSON.parse(msg2JSONText);
      /* Your code to process the result goes here - 
             display the returned message */
      /* Your code to process the result goes here  
                  display the returned message */
      var stockdate = [];
      var stockvalue = [];
      var numdays = msg2.results.length;
      if (numdays > 0) {
        for (var i = 0; i < numdays; i++) {
          /* stock close value */
          stockvalue[i] = msg2.results[i].c;
          /* date is in Unix milleseconds - create a temporary date variable */
          var tempdate = new Date(msg2.results[i].t);
          /* extract the date string from the value */
          stockdate[i] = tempdate.toLocaleDateString();
        }
      }

      var ctx0 = document.getElementById("chartjs");
      var myChart = new Chart(ctx0, {
        type: "line",
        data: {
          labels: stockdate,
          datasets: [
            {
              label: baseCurrency + " to " + toCurrency,
              data: stockvalue,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              lineTension: 0.1,
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: true,
        },
      });
    }
  }
}

// Function to clear form inputs, errors, and results
function ClearForm() {
  document.getElementById("baseCurrency").value = "";
  document.getElementById("toCurrency").value = "";
  document.getElementById("fromDate").value = "";
  document.getElementById("toDate").value = "";
  
  document.getElementById("baseCurrencyError").innerHTML = "";
  document.getElementById("toCurrencyError").innerHTML = "";
  document.getElementById("fromDateError").innerHTML = "";
  document.getElementById("toDateError").innerHTML = "";
}

// Validate form using jQuery Validation Plugin
$(document).ready(function () {
  $("#myform").validate();
});

var ctx = document.getElementById("chartjs-0");

var myChart = new Chart(ctx, {
    "type":"line",
    "data": {
        "labels": dates,
        "datasets":[{
            "data": values,
            fill: false
        }]
    },
    "options":{ 
        responsive: false,
        maintainAspectRatio: true,
    }
});