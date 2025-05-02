async function calculate() {
  "use strict";
  if ($("#myform").valid()) {
    let fromValue = document.getElementById("FromValue").value;
    let fromUnit;
    if (document.getElementById("FromCentimeters").checked) {
      fromUnit = document.getElementById("FromCentimeters").value;
    }
    if (document.getElementById("FromMeters").checked) {
      fromUnit = document.getElementById("FromMeters").value;
    }
    if (document.getElementById("FromKilometers").checked) {
      fromUnit = document.getElementById("FromKilometers").value;
    }
    if (document.getElementById("FromInches").checked) {
      fromUnit = document.getElementById("FromInches").value;
    }
    if (document.getElementById("FromFeet").checked) {
      fromUnit = document.getElementById("FromFeet").value;
    }
    if (document.getElementById("FromYards").checked) {
      fromUnit = document.getElementById("FromYards").value;
    }
    if (document.getElementById("FromMiles").checked) {
      fromUnit = document.getElementById("FromMiles").value;
    }

    let toUnit;
    if (document.getElementById("ToCentimeters").checked) {
      toUnit = document.getElementById("ToCentimeters").value;
    }
    if (document.getElementById("ToMeters").checked) {
      toUnit = document.getElementById("ToMeters").value;
    }
    if (document.getElementById("ToKilometers").checked) {
      toUnit = document.getElementById("ToKilometers").value;
    }
    if (document.getElementById("ToInches").checked) {
      toUnit = document.getElementById("ToInches").value;
    }
    if (document.getElementById("ToFeet").checked) {
      toUnit = document.getElementById("ToFeet").value;
    }
    if (document.getElementById("ToYards").checked) {
      toUnit = document.getElementById("ToYards").value;
    }
    if (document.getElementById("ToMiles").checked) {
      toUnit = document.getElementById("ToMiles").value;
    }

    if (!fromUnit || !toUnit) {
      alert("Please select both 'From' and 'To' units.");
      return;
    }

    let myURL =
      "https://brucebauer.info/assets/ITEC3650/unitsconversion.php";
    myURL =
      myURL +
      "?FromValue=" +
      encodeURIComponent(fromValue) +
      "&FromUnit=" +
      encodeURIComponent(fromUnit) +
      "&ToUnit=" +
      encodeURIComponent(toUnit);

    console.log("API URL:", myURL);

    try {
      let myConversion = await fetch(myURL);
      if (!myConversion.ok) {
        throw new Error(`HTTP error! Status: ${myConversion.status}`);
      }
      let toValue = await myConversion.text();
      document.getElementById("ToValue").innerHTML = toValue.toString();
    } catch (error) {
      console.error("Error fetching conversion data:", error);
      alert(
        "An error occurred while fetching conversion data. Please try again."
      );
    }
  }
}

function clearForm() {
  document.getElementById("FromValue").value = "";
  document.getElementById("ToValue").innerHTML = "";
  document.getElementById("FromCentimeters").checked = false;
  document.getElementById("FromMeters").checked = false;
  document.getElementById("FromKilometers").checked = false;
  document.getElementById("FromInches").checked = false;
  document.getElementById("FromFeet").checked = false;
  document.getElementById("FromYards").checked = false;
  document.getElementById("FromMiles").checked = false;
  document.getElementById("ToCentimeters").checked = false;
  document.getElementById("ToMeters").checked = false;
  document.getElementById("ToKilometers").checked = false;
  document.getElementById("ToInches").checked = false;
  document.getElementById("ToFeet").checked = false;
  document.getElementById("ToYards").checked = false;
  document.getElementById("ToMiles").checked = false;

  document.getElementById("myform").reset();
  document.getElementById("Result").innerText = "";
}