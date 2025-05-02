function calculate() {
    const operand1 = parseFloat(document.getElementById("Operand1").value);
    const operand2 = parseFloat(document.getElementById("Operand2").value);
    const operator = document.querySelector('input[name="Operator"]:checked').value;

    let result;
    switch(operator) {
        case 'plus':
            result = operand1 + operand2;
            break;
        case 'minus':
            result = operand1 - operand2;
            break;
        case 'times':
            result = operand1 * operand2;
            break;
        case 'division':
            result = operand1 / operand2;
            break;
        default:
            result = 'Invalid Operation';
    }

    // Display the result
    document.getElementById("Result").innerText = result;
}

function clearform() {
    document.getElementById("myform").reset();
    document.getElementById("Result").innerText = "";
}

$("#calculatorForm").validate({
    rules: {
        Operand1: {
            required: true,
            number: true
        },
        Operand2: {
            required: true,
            number: true
        },
        Operator: {
            required: true
        }
    },
    messages: {
        Operand1: {
            required: "Operand 1 is required",
            number: "Operand 1 must be a number"
        },
        Operand2: {
            required: "Operand 2 is required",
            number: "Operand 2 must be a number"
        },
        Operator: {
            required: "Operator is required"
        }
    },
    errorPlacement: function(error, element) {
        if (element.attr("name") === "Operator") {
            error.appendTo("#OperatorError");
        } else {
            error.appendTo(`#${element.attr("name")}Error`);
        }
    }
});
});