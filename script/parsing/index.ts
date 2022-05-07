import {
    ERROR_NEGATE,
    IncorrectInputError,
    Operator,
    ParseResult
} from "../constants";
import {isFloat, isNegate, isOperator} from "../utils";

const parseInput = (input : string) : ParseResult => {
    const baseArray : string[] = input.split(' ')
    const numbers : number[] = []
    const operators : Operator[] = []

    baseArray.forEach((item, i) => {
        if(item === '') {
            return
        }

        const number = isFloat(item)
        if(number) {
            numbers.push(number)
            return
        }

        const operator = isOperator(item)
        if(operator) {
            operators.push(operator)
            return
        }

        const negate = isNegate(item)
        if(negate) {
            const previousIndex = baseArray[i - 1]
            if (previousIndex && isFloat(previousIndex)) {
                numbers[numbers.length - 1] = - numbers[numbers.length - 1]
                return
            }
            throw new Error(ERROR_NEGATE)
        }

        throw new IncorrectInputError(item)
    })

    return {
        numbers,
        operators
    }
}

export {
    parseInput
}