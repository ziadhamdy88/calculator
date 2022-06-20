class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    concatNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')){
            return;
        }
        let possibleOperand = this.currentOperand.toString() + number.toString();
        if(possibleOperand.length > 14){
            return;
        }
        this.currentOperand = possibleOperand;
    }

    changeSign(){
        if(this.currentOperand === ''){
            return;
        }
        this.currentOperand *= -1;
    }

    selectOperation(operation) {
        if(this.currentOperand === ''){
            return;
        }
        if(this.previousOperand !== ''){
            this.evaluate();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    evaluate() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(curr)){
            return;
        }
        
        switch(this.operation){
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            case '%':
                result = prev / 100;
                break;
        }
        if(result.toString().length > 14){
            result = result.toPrecision(10);
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getNumberFormat(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerFormat

        if(isNaN(integerDigits)){
            integerFormat = '';
        }
        else{
            integerFormat = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0});
        }
        if(decimalDigits != null){
            return `${integerFormat}.${decimalDigits}`;
        }
        else{
            return integerFormat;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.textContent = this.getNumberFormat(this.currentOperand);
        
        if(this.operation != null){
            this.previousOperandTextElement.textContent = `${this.previousOperand} ${this.operation}`;
        }
        else{
            this.previousOperandTextElement.textContent = '';
        }
        
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }


}

const numberButtons = document.querySelectorAll('[data-digit]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const signButton = document.querySelector('[data-sign]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.concatNumber(button.textContent);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.textContent);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.evaluate();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

signButton.addEventListener('click', button => {
    calculator.changeSign();
    calculator.updateDisplay();
});