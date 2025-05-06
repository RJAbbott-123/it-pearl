function calculate() {
    let form = $( "#myform" );
    
if (form.valid()) {

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
}

function clearform() {
    document.getElementById("myform").reset();
    document.getElementById("Result").innerText = "";
    document.getElementById("Operand1Error").innerHTML = "";
    document.getElementById("Operand2Error").innerHTML = "";
    document.getElementById("OperatorError").innerHTML = "";
}
