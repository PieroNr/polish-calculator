import { Operator, calculatePolish, parseInput, ERROR_NEGATE, ParseResult, isFloat, isNegate, isOperator, ERROR_INCORRECT_OPERATORS } from "../../index";

test("When array of array of number and array of operator is request, it should return the result", function () {
    const calcul: ParseResult = {numbers: [1,2,3], operators: ['+','+']};
    expect(calculatePolish('', calcul)).toEqual(6);
});

test("When array of array of number and array of operator is request, it should return the result", function () {
    const calcul: ParseResult = {numbers: [4,2,3], operators: ['+','-']};
    expect(calculatePolish('', calcul)).toEqual(3);
})

test("When array of array of number and array of operator is request, it should return the result", function () {
    const calcul: ParseResult = {numbers: [10,13,41,9,10,4], operators: ['*','-','-','/','+']};
    expect(calculatePolish('', calcul)).toEqual(12);
})

test("When array of array of number and array of operator is request, it should return the result", function () {
    const calcul: ParseResult = {numbers: [4,2,3], operators: ['+','-','+']};
    const triggerError = () => {
        calculatePolish('', calcul)
    }
    expect(triggerError).toThrowError(ERROR_INCORRECT_OPERATORS);
})

test("When array of array of number and array of operator is request, it should return the result", function () {
    const calcul:ParseResult = {numbers: [4,2,3], operators: ['+']};
    expect(calculatePolish('', calcul)).toEqual('error : Nombre d\'opérateur incorrect');
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
})