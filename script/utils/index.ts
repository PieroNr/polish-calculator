import {Operator} from "../constants";

const isOperator = (string : string) : Operator | false => {
    return string === "+" || string === "-" || string === "*" || string === "/" ? string : false;
}

const isNegate = (string : string) : boolean => {
    return string === "NEGATE";
}

const isFloat = (string : string) : number | false => {
    return !isNaN(Number(string)) ? parseFloat(string) : false;
}

export {
    isOperator,
    isNegate,
    isFloat,
}