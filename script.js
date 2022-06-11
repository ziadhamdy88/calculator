function add(firstNumber, secondNumber){
    return firstNumber+secondNumber;
}

function subtract(firstNumber, secondNumber){
    return firstNumber-secondNumber;
}

function multiply(firstNumber, secondNumber){
    return firstNumber*secondNumber;
}

function divide(firstNumber, secondNumber){
    return firstNumber/secondNumber;
}

function operation(operator, firstNumber, secondNumber){
    switch(operator){
        case '+':
            console.log(add(firstNumber, secondNumber));
            break;
        case '-':
            console.log(subtract(firstNumber, secondNumber));
            break;
        case '*':
            console.log(multiply(firstNumber, secondNumber));
            break;
        case '/':
            console.log(divide(firstNumber, secondNumber));
            break;
    }
}