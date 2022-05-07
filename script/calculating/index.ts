import {
    ERROR_INCORRECT_OPERATORS_NUMBER,
    ERROR_UNSPECIFIED,
    IncorrectOperatorError,
    Operator,
    ParseResult
} from "../constants";
import {parseInput} from "../parsing";

const calculatePolish = (calculStr: string | null = null , calculTab : ParseResult | null = null): number => {
    let tabNum: Array<number>;
    let tabOpe: Array<Operator>;
    if(calculStr){
        const calculArray: ParseResult = parseInput(calculStr);
        tabNum = calculArray.numbers;
        tabOpe = calculArray.operators;
    } else if(calculTab){
        tabNum= calculTab.numbers;
        tabOpe = calculTab.operators;
    } else {
        throw new Error(ERROR_UNSPECIFIED);
    }

    if(tabOpe.length != tabNum.length-1){
        throw new Error(ERROR_INCORRECT_OPERATORS_NUMBER)
    }

    tabOpe.forEach(operator => {
        tabNum[1] = applyOperator(tabNum[0], tabNum[1], operator)
        tabNum.shift();
    });

    return tabNum[0];

};

const applyOperator = (number1 : number, number2 : number, operator : string) : number => {
    switch(operator){
        case '+':
            return number1 + number2;
        case '-':
            return number1 - number2;
        case '*':
            return number1 * number2;
        case '/':
            return number1 / number2;
        default:
            throw new IncorrectOperatorError(operator);
    }
}

export {
    calculatePolish,
    applyOperator,
}