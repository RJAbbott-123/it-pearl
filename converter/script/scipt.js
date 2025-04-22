// Function to retrieve the selected radio button value by name
function getSelectedOperator(groupName) {
    // Use jQuery for consistency
    return $(`input[name='${groupName}']:checked`).val();
  }

  // Calculate conversion based on operand and selected units
  async function performCalculation() {
    // Clear previous result and errors handled by validation plugin
    $("#ResultContainer").html(""); // Clear previous result

    // Get values using jQuery
    var operandInput = $("#Operand").val().trim();
    var operand = parseFloat(operandInput); // Already validated as number by plugin
    var operator = getSelectedOperator("Operator");
    var operator2 = getSelectedOperator("Operator2");

    // Construct the URL for the AJAX request
    var url = 'https://brucebauer.info/assets/ITEC3650/unitsconversion.php?Operand=' +
              encodeURIComponent(operand) +
              '&Operator=' + encodeURIComponent(operator) +
              '&Operator2=' + encodeURIComponent(operator2);

    console.log("AJAX request URL: " + url);
    $("#ResultContainer").html("Calculating..."); // Provide feedback

    try {
      // Fetch conversion result using jQuery AJAX for consistency
      $.ajax({
        url: url,
        method: 'GET',
        success: function(result) {
          $("#ResultContainer").html(result); // Display result
          console.log("Result received:", result);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error("Error fetching result:", textStatus, errorThrown);
          $("#ResultContainer").html("Error fetching conversion result: " + textStatus);
        }
      });

    } catch (error) { // Catch potential synchronous errors (less likely with $.ajax)
      console.error("Error setting up fetch:", error);
      $("#ResultContainer").html("Error setting up conversion request.");
    }
  }

  // Function to clear the form inputs, selections, and error messages
  function clearForm() {
    // Clear operand input
    $("#Operand").val("");

    // Clear radio button selections for "From Unit"
    $("input[name='Operator']").prop('checked', false);

    // Clear radio button selections for "To Unit"
    $("input[name='Operator2']").prop('checked', false);

    // Clear result
    $("#ResultContainer").html("");

    // Clear validation errors using the plugin's method
    validator.resetForm(); // Reset the validation state and hide messages
    $(".error").empty(); // Also clear the content of specific error spans if needed

    console.log("Form cleared.");
  }

  // Initialize jQuery Validate and store the validator instance
  var validator;
  $(document).ready(function () {
    validator = $("#convertor").validate({
      rules: {
        Operand: {
          required: true,
          number: true // Ensures input is a number
        },
        Operator: "required", // Makes the radio group required
        Operator2: "required"  // Makes the radio group required
      },
      messages: {
        Operand: {
          required: "From value is required.",
          number: "Please enter a valid number."
        },
        Operator: "Please select a 'From Unit'.",
        Operator2: "Please select a 'To Unit'."
      },
      errorElement: "span", // Use span for errors
      errorClass: "error", // Use this class for error messages
      errorPlacement: function (error, element) {
        if (element.attr("name") === "Operand") {
          error.insertAfter(element); // Place error after the input field
        } else if (element.attr("name") === "Operator") {
          error.appendTo("#OperatorMsg"); // Place error in the designated span
        } else if (element.attr("name") === "Operator2") {
          error.appendTo("#Operator2Msg"); // Place error in the designated span
        } else {
          error.insertAfter(element); // Default placement
        }
      },
      // Do NOT use submitHandler, as we trigger calculation manually
    });

    // Attach click handlers to buttons
    $("#calculateButton").on("click", function() {
      // Manually trigger validation
      if ($("#convertor").valid()) {
        // If form is valid, perform the calculation
        performCalculation();
      } else {
        console.log("Form is invalid. Calculation aborted.");
        $("#ResultContainer").html(""); // Clear result if form is invalid
      }
    });

    $("#clearButton").on("click", clearForm);
  });