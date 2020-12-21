const input = require('./input.json');
let result = 0;
input.data.forEach(aRow => {
    const terms = aRow.replace(/\(/g, '( ').replace(/\)/g, ' )').split(' ');
    // console.log(terms);
    for (let i = 0; i < terms.length - 2; i++) {
        // console.log('validating', terms[i], terms[i + 1], terms[i + 2]);
        if (!isNaN(parseInt(terms[i])) &&
            (terms[i + 1] === '+' || terms[i + 1] === '*') &&
            !isNaN(parseInt(terms[i + 2]))
        ) {
            terms.splice(i, 3, eval(terms[i] + terms[i + 1] + terms[i + 2]).toString());
            // console.log(i, terms);
            i = -1;
        } else if (terms[i] === '(' &&
            !isNaN(parseInt(terms[i + 1])) &&
            terms[i + 2] === ')'
        ) {
            terms.splice(i, 3, terms[i + 1]);
            // console.log(i, terms);
            i = -1;
        }
    }
    // console.log(terms);
    result += parseInt(terms[0]);
});
console.log(result);