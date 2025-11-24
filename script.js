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
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a,b);
    } else if (operator === 'x') {
        return multiply(a,b);
    }else if (operator === '/') {
        return divide(a,b);
    }
}

let num1 = 0;
let num2 = 0;
let operator = '';

const layout = [
    ['7','8','9','Clear'],
    ['4','5','6','/'],
    ['1','2','3','x'],
    ['0','+','-','='],
]

const keys = document.querySelector('.keys');
const display = document.querySelector('.display');

display.textContent = '0';

layout.forEach(row => {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('calcRow');

    row.forEach(key => {
        const newKey = document.createElement('button');
        newKey.textContent = key;

        if (['/', 'x', '-', '+'].includes(key)) {
            newKey.classList.add('operator');
            newKey.addEventListener('click', () => {
                if (num1 >= 0) {
                    operator = `${newKey.textContent}`;
                    console.log(operator);
                }
            })
        } else if (['='].includes(key)) {
            newKey.classList.add('equals');
            newKey.addEventListener('click', () => {
                display.textContent = `0`;
                num1 = 0;
                num2 = 0;
                operator = '';
            })
        } else if (['Clear'].includes(key)) {
            newKey.classList.add('clear');
            newKey.addEventListener('click', () => {
                display.textContent = `0`;
                num1 = 0;
                num2 = 0;
                operator = '';
            })
            
        } else {
            newKey.classList.add('digit');
            newKey.addEventListener('click', () => {
                display.textContent = `${newKey.textContent}`;
                if (operator === '') {
                    num1 = parseInt(newKey.textContent);
                    console.log(`num1: ${num1}`);
                } else {
                    num2 = parseInt(newKey.textContent);
                    console.log(`num2: ${num2}`);
                }
            })
        }

        rowContainer.appendChild(newKey);
    })
    keys.appendChild(rowContainer);
})