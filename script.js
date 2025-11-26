
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

const MAX_DIGITS = 20;

let num1 = '0';
let num2 = '-1';
let operator = '';
let prevCalc = false;
let firstDigit = true;
let errorFlag = false;
let num2Entered = false;
let currNum = 1; //This can be 1 for num1 or 2 for num2
const keyPrefix = 'key-';

const layout = [
    ['7','8','9','Clear'],
    ['4','5','6','/'],
    ['1','2','3','x'],
    ['0','+','-','='],
    ['Backspace','.']
]

const keyDict = {
    '/':'divide',
    'x':'times',
    '+':'plus',
    '-':'minus',
    '1':'one',
    '2':'two',
    '3':'three',
    '4':'four',
    '5':'five',
    '6':'six',
    '7':'seven',
    '8':'eight',
    '9':'nine',
    '0':'zero',
    'Enter':'equals',
    'Backspace':'Backspace',
    '.':'decimal'
}

const availKeys = ['7','8','9','Enter',
    '4','5','6','/',
    '1','2','3','x',
    '0','+','-','Backspace','.']

const keys = document.querySelector('.keys');
const display = document.querySelector('.display');

display.textContent = '0';

layout.forEach(row => {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('calcRow');

    row.forEach(key => {
        const newKey = document.createElement('button');
        newKey.textContent = key;
        newKey.id = `${keyPrefix}${keyDict[key]}`;

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
            newKey.id = `${keyPrefix}${keyDict['Enter']}`;
            newKey.addEventListener('click', () => {

                if (operator !== '') {
                    if (operator === '/' && num2 === '0') {
                        display.textContent = 'CANNOT DIVIDE BY 0';
                        errorFlag = true;
                        return;
                    }

                    if (!num2Entered) {
                        display.textContent = 'PLEASE ENTER THE SECOND NUMBER';
                        errorFlag = true;
                        return;
                    }

                    prevCalc = true;
                    let calcNum = operate(operator, parseFloat(num1), parseFloat(num2));
                    num1 = `${calcNum}`.substring(0,MAX_DIGITS);
                    display.textContent = num1;
                    num2 = '-1';
                    operator = '';
                    firstDigit = true;
                    num2Entered = false;
                    currNum = 1;
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
                num2Entered = false;
                currNum = 1;
            })
            
        } else if (['Backspace'].includes(key)){
            newKey.classList.add('Backspace');

            newKey.addEventListener('click', () => {
                let currDisplay = display.textContent;
                if (currDisplay.length == 1) {
                    currDisplay = '0';
                } else {
                    currDisplay = currDisplay.slice(0,-1);
                }

                display.textContent = currDisplay;
                
                if (currNum === 1) {
                    num1 = currDisplay;
                } else if (currNum === 2) {
                    num2 = currDisplay;
                }
            })
        } else if (['.'].includes(key)) {
            newKey.classList.add('decimal');
            newKey.id = `${keyPrefix}${keyDict['.']}`;
            newKey.addEventListener('click', () => {
                let currDisplay = display.textContent;
                if (!currDisplay.includes(key)) {
                    currDisplay += key;
                    display.textContent = currDisplay;
                    if (currNum === 1) {
                        num1 = currDisplay;
                        console.log(`num1 is ${num1}`);
                    } else if (currNum === 2) {
                        num2 = currDisplay;
                        console.log(`num2 is ${num1}`)
                    }
                }
            })

        } else {
            newKey.classList.add('digit');
            newKey.addEventListener('click', () => {
                if (errorFlag) {
                    const clearBtn = document.querySelector('.clear');
                    clearBtn.click();
                }

                if (prevCalc === false && operator === '') {
                    currNum = 1;
                    if (num1.length < MAX_DIGITS) {
                        if (parseFloat(display.textContent) == 0 && (!display.textContent.includes('.'))) {
                            console.log('Here');
                            display.textContent = `${newKey.textContent}`;
                        } else {
                            console.log('Here2');
                            display.textContent += `${newKey.textContent}`;
                        }
                    }
                    num1 = display.textContent;
                } else {
                    currNum = 2;
                    if (num2.length < MAX_DIGITS) {
                        if (parseFloat(num2) <= 0 && parseFloat(newKey.textContent) == 0 && (!display.textContent.includes('.'))) {
                            display.textContent = '0';
                        } else if (firstDigit) {
                            display.textContent = `${newKey.textContent}`;
                            firstDigit = false;
                        } else {
                            display.textContent += `${newKey.textContent}`;
                        }
                    }
                    num2Entered = true;
                    num2 = display.textContent;
                }
            })
        }

        rowContainer.appendChild(newKey);
    })
    keys.appendChild(rowContainer);
})

document.addEventListener('keydown', function(event) {
    // Add keyboard functionality for backspace
    const keyVal = event.key;
    console.log(keyVal);

    if (availKeys.includes(keyVal)) {
        let btnToClick = document.querySelector(`#${keyPrefix+keyDict[keyVal]}`);
        btnToClick.click();
    }
});