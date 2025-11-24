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

function operate(op, a, b) {
    if (op === '+') {
        return add(a, b);
    } else if (op === '-') {
        return subtract(a,b);
    } else if (op === 'x') {
        return multiply(a,b);
    }else if (op === '/') {
        return divide(a,b);
    }
}

let num1 = '0';
let num2 = '-1';
let operator = '';
let prevCalc = false;
let firstDigit = true;
let errorFlag = false;

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
                if (errorFlag) {
                    const clearBtn = document.querySelector('.clear');
                    clearBtn.click();
                }
                if (num2 !== '-1') {
                    const equalsBtn = document.querySelector('.equals');
                    equalsBtn.click();
                }
                operator = `${newKey.textContent}`;

            })
        } else if (['='].includes(key)) {
            newKey.classList.add('equals');
            newKey.addEventListener('click', () => {
                console.log(operator);
                if (operator !== '') {
                    if (operator === '/' && num2 === '0') {
                        display.textContent = 'CANNOT DIVIDE BY 0';
                        errorFlag = true;
                        return;
                    }
                    console.log(num1+operator+num2);
                    prevCalc = true;
                    let calcNum = operate(operator, parseInt(num1), parseInt(num2));
                    display.textContent = `${calcNum}`;
                    num1 = `${calcNum}`;
                    num2 = '-1';
                    operator = '';
                    firstDigit = true;
                }
            })
        } else if (['Clear'].includes(key)) {
            newKey.classList.add('clear');
            newKey.addEventListener('click', () => {
                display.textContent = `0`;
                num1 = '0';
                num2 = '-1';
                operator = '';
                prevCalc = false;
                firstDigit = true;
                errorFlag = false;
            })
            
        } else {
            newKey.classList.add('digit');
            newKey.addEventListener('click', () => {
                if (errorFlag) {
                    const clearBtn = document.querySelector('.clear');
                    clearBtn.click();
                }

                if (prevCalc === false && operator === '') {
                    if (display.textContent === '0') {
                        display.textContent = `${newKey.textContent}`;
                    } else {
                        display.textContent += `${newKey.textContent}`
                    }
                    num1 = display.textContent;
                } else {
                    if (firstDigit) {
                        display.textContent = `${newKey.textContent}`;
                        firstDigit = false;
                    } else {
                        display.textContent += `${newKey.textContent}`
                    }
                    num2 = display.textContent;
                }
            })
        }

        rowContainer.appendChild(newKey);
    })
    keys.appendChild(rowContainer);
})