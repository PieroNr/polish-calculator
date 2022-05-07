import {ERROR_INCORRECT_OPERATORS_NUMBER, ERROR_NEGATE, IncorrectOperatorError, ParseResult} from "../../constants";
import {applyOperator, calculatePolish} from "../../calculating";
import {parseInput} from "../../parsing";
import {isFloat, isNegate, isOperator} from "../../utils";

test("When array of array of number and array of operator is request, it should return the result", function () {
    let calcul: ParseResult = {numbers: [1,2,3], operators: ['+','+']};
    expect(calculatePolish('', calcul)).toEqual(6);

    calcul = {numbers: [4,2,3], operators: ['+','-']};
    expect(calculatePolish('', calcul)).toEqual(3);

    calcul = {numbers: [10,13,41,9,10,4], operators: ['*','-','-','/','+']};
    expect(calculatePolish('', calcul)).toEqual(12);
});

test("When array their are too much operators it should return an error", function () {
    const calcul: ParseResult = {numbers: [4,2,3], operators: ['+','-','+']};
    const testError = () => {
        calculatePolish('', calcul)
    }
    expect(testError).toThrowError(ERROR_INCORRECT_OPERATORS_NUMBER);
})

test("When array their are not enough operators it should return an error", function () {
    const testError = () => {
        const calcul:ParseResult = {numbers: [4,2,3], operators: ['+']};
        calculatePolish('', calcul)
    }

    expect(testError).toThrowError(ERROR_INCORRECT_OPERATORS_NUMBER);
})

test("When the correct arguments are passed to applyOperator it return the correct result", function () {
    expect(applyOperator(1, 2, '+')).toEqual(3)
    expect(applyOperator(1, 2, '-')).toEqual(-1)
    expect(applyOperator(1, 2, '*')).toEqual(2)
    expect(applyOperator(1, 2, '/')).toEqual(0.5)
})

test("When a wrong operator is passed to applyOperator it return an error", function () {
    const testError = () => {
        applyOperator(1, 2, 'test')
    }
    expect(testError).toThrow(IncorrectOperatorError)
})

test("When a string is given to parseInput it return a correct ParseResult", function() {
    const input = "3 4 2 + -";
    expect(parseInput(input)).toStrictEqual({
        numbers : [3, 4, 2],
        operators : ['+', '-']
    })
})

test("When a string is given to parseInput with NEGATE it return a correct ParseResult", function() {
    const input = "78 10 NEGATE 9 / *";
    expect(parseInput(input)).toStrictEqual({
        numbers : [78, -10, 9],
        operators : ['/', '*']
    })
})

test("When NEGATE is in the wrong position it should return an error", function () {
    const testError = () => {
        const input2 = "NEGATE 5 2 +";
        parseInput(input2)
    }

    expect(testError).toThrowError(ERROR_NEGATE)
})

test("When a number is passed to isFloat, it return a number but if not it return false", function() {
    expect(isFloat('5')).toEqual(5)
    expect(isFloat('test')).toEqual(false)
})

test("When NEGATE is passed to isNegate, it return a true but if not it return false", function() {
    expect(isNegate('NEGATE')).toEqual(true)
    expect(isNegate('test')).toEqual(false)
})

test("When an operator is passed to isOperator, it return the operator but if not it return false", function() {
    expect(isOperator('+')).toEqual('+')
    expect(isOperator('-')).toEqual('-')
    expect(isOperator('*')).toEqual('*')
    expect(isOperator('/')).toEqual('/')
    expect(isOperator('test')).toEqual(false)
});