function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    // Include divide by 0 error message
    return a/b;
}

function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a,b);
    } else if (operator === "*") {
        return multiply(a,b);
    }else if (operator === "/") {
        return divide(a,b);
    }
}

let num1 = 3;
let num2 = 5;
let operator = "";

console.log(operate("+",num1,num2));
console.log(operate("-",num1,num2));
console.log(operate("*",num1,num2));
console.log(operate("/",num1,num2));