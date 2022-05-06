
export type Operator = '+' | '-' | '*' | '/';

export type Negate = 'NEGATE'

export type ParseResult = {numbers : Array<number>, operators : Array<Operator>}

export const ERROR_NEGATE = "Negate must be placed right after a number !"
export const ERROR_UNSPECIFIED = "A calcul must be specified !"
export const ERROR_INCORRECT_OPERATORS = "Incorrect operator number !"


export const isOperator = (string : string) : Operator | false => {
    return string === "+" || string === "-" || string === "*" || string === "/" ? string : false;
}

export const isNegate = (string : string) : boolean => {
    return string === "NEGATE";
}

export const isFloat = (string : string) : number | false => {
    const number = parseFloat(string)
        return !isNaN(number) ? number : false;
}


export const parseInput = (input : string) : ParseResult => {
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
    })
    
    return {
        numbers,
        operators
    }
}

export const calculatePolish = (calculStr: string | null = null , calculTab : ParseResult | null = null): number | string | Error => {
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
        return new Error(ERROR_UNSPECIFIED); 
    }
    
    
    

    if(tabOpe.length != tabNum.length-1){
        throw new Error(ERROR_INCORRECT_OPERATORS)
    }

    tabOpe.forEach(operator => {
        switch(operator){
            case '+':
                tabNum[1] = tabNum[0] + tabNum[1];
                break;
            case '-':
                tabNum[1] = tabNum[0] - tabNum[1];
                break;
            case '*':
                tabNum[1] = tabNum[0] * tabNum[1];
                break;
            case '/':
                tabNum[1] = tabNum[0] / tabNum[1];
                break;
            default:
                return 'error : Opérateur non valide (' + operator + ')';       
        }
        tabNum.shift();  
    });

    return tabNum[0];

};