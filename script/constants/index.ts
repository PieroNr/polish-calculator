type Operator = '+' | '-' | '*' | '/';

type ParseResult = {numbers : Array<number>, operators : Array<Operator>}

const ERROR_NEGATE = "Negate must be placed right after a number !"
const ERROR_UNSPECIFIED = "A calcul must be specified !"
const ERROR_INCORRECT_OPERATORS_NUMBER = "Incorrect operator number !"

class IncorrectOperatorError extends Error {
    constructor(wrongOperator : string) {
        super("Incorrect operator : " + wrongOperator);
    }
}

class IncorrectInputError extends Error {
    constructor(wrongInput : string) {
        super(wrongInput + " is neither a number or an operator !");
    }
}

export {
    Operator,
    ParseResult,
    ERROR_NEGATE,
    ERROR_UNSPECIFIED,
    ERROR_INCORRECT_OPERATORS_NUMBER,
    IncorrectOperatorError,
    IncorrectInputError,
}