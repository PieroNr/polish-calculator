
export type Operator = '+' | '-' | '*' | '/';

export const calculatePolish = (calculStr: string, calculTab: [Array<number>,Array<Operator>]): number | string => {
    /* const {<number>, <Operator>} = parseInput(calculStr); */
    const tabNum = calculTab[0];
    const tabOpe = calculTab[1];

    if(tabOpe.length != tabNum.length-1){
        return 'error : Nombre d\'opérateur incorrect'
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