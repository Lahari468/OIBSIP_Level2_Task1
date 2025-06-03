const display = document.getElementById('display');
const operationDisplay = document.getElementById('operation-display');
let currentInput = '0', previousInput = '', operation = null, resetScreen = false, operationString = '';

const updateDisplay = () => {
    display.textContent = currentInput;
    operationDisplay.textContent = operationString;
};

const appendNumber = number => {
    if (currentInput === '0' || resetScreen) {
        currentInput = '';
        resetScreen = false;
    }
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
};

const appendOperator = op => {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    resetScreen = true;
    operationString = `${previousInput} ${operation}`;
    updateDisplay();
};

const calculate = () => {
    const prev = parseFloat(previousInput), current = parseFloat(currentInput);
    if (isNaN(prev)) return;
    
    const operations = {
        '+': prev + current,
        '-': prev - current,
        '*': prev * current,
        '/': prev / current
    };
    
    if (operation in operations) {
        operationString = `${previousInput} ${operation} ${currentInput} =`;
        currentInput = operations[operation].toString();
        operation = null;
        updateDisplay();
    }
};

const calculatePercentage = () => {
    const value = parseFloat(currentInput);
    if (!isNaN(value)) {
        operationString = `${currentInput}% =`;
        currentInput = (value / 100).toString();
        updateDisplay();
    }
};

const calculateSqrt = () => {
    const value = parseFloat(currentInput);
    if (!isNaN(value)){
        operationString = `√(${currentInput}) =`;
        currentInput = Math.sqrt(value).toString();
        updateDisplay();
    }
};

const calculateLog = () => {
    const value = parseFloat(currentInput);
    if (!isNaN(value)) {
        operationString = `log(${currentInput}) =`;
        currentInput = Math.log10(value).toString();
        updateDisplay();
    }
};

const clearDisplay = () => {
    currentInput = '0';
    previousInput = '';
    operation = null;
    operationString = '';
    updateDisplay();
};

updateDisplay();