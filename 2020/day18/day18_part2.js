const input = require('./input.json');
let result = 0;
const processExpr = (exp) => {
    startParIndex = exp.findIndex(char => char === '(')
    while(startParIndex >= 0) {
        auxCont = 1;
        let endParIndex = startParIndex + 1;
        for (; endParIndex < exp.length; endParIndex++) {
            if (exp[endParIndex] === '(') {
                auxCont++;
            } else if (exp[endParIndex] === ')') {
                auxCont--;
            }
            if (auxCont === 0) {
                exp.splice(startParIndex, endParIndex - startParIndex + 1, processExpr(exp.slice(startParIndex + 1, endParIndex)));
                break;
            }
        }
        startParIndex = exp.findIndex(char => char === '(')
    }
    let operator = '+';
    for (let i = 0; i < exp.length - 2; i++) {
        if (!isNaN(parseInt(exp[i])) &&
            (exp[i + 1] === operator) &&
            !isNaN(parseInt(exp[i + 2]))
        ) {
            exp.splice(i, 3, eval(exp[i] + exp[i + 1] + exp[i + 2]).toString());
            operator = '+';
            i = -1;
        } else if (exp[i] === '(' &&
            !isNaN(parseInt(exp[i + 1])) &&
            exp[i + 2] === ')'
        ) {
            exp.splice(i, 3, exp[i + 1]);
            i = -1;
        }
        if (i === exp.length - 3) {
            operator = '*';
            i = -1;
        }
    }
    return parseInt(exp[0]);
}
input.data.forEach(aRow => {
    const terms = aRow.replace(/\(/g, '( ').replace(/\)/g, ' )').split(' ');
    result += processExpr(terms);
});
console.log(result);