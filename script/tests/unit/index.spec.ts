import { Operator, calculatePolish } from "../../index";

test("When array of array of number and array of operator is request, it should return the result", function () {
    const calcul: [Array<number>,Array<Operator>] = [[1,2,3],['+','+']];
    expect(calculatePolish('',calcul)).toEqual(6);
});

test("When array of array of number and array of operator is request, it should return the result", function () {
    const calcul: [Array<number>,Array<Operator>] = [[4,2,3],['+','-']];
    expect(calculatePolish('',calcul)).toEqual(3);
})

test("When array of array of number and array of operator is request, it should return the result", function () {
    const calcul: [Array<number>,Array<Operator>] = [[10,13,41,9,10,4],['*','-','-','/','+']];
    expect(calculatePolish('',calcul)).toEqual(12);
})

test("When array of array of number and array of operator is request, it should return the result", function () {
    const calcul: [Array<number>,Array<Operator>] = [[4,2,3],['+','-','+']];
    expect(calculatePolish('',calcul)).toEqual('error : Nombre d\'opérateur incorrect');
})

test("When array of array of number and array of operator is request, it should return the result", function () {
    const calcul: [Array<number>,Array<Operator>] = [[4,2,3],['+']];
    expect(calculatePolish('',calcul)).toEqual('error : Nombre d\'opérateur incorrect');
})


