const input = require('./input.json');
const positions = { '0-0': true };
let x1 = y1 = x2 = y2 = 0;
input.data.split('').forEach((aMov, idxMov) => {
    idxMov % 2 === 0 &&
    ((aMov === '^' && ++y1 === y1) ||
    (aMov === 'v' && --y1 === y1) ||
    (aMov === '>' && ++x1 === x1) ||
    (aMov === '<' && --x1 === x1)) && 
    (positions[`${x1}-${y1}`] = true);
    idxMov % 2 === 1 &&
    ((aMov === '^' && ++y2 === y2) ||
    (aMov === 'v' && --y2 === y2) ||
    (aMov === '>' && ++x2 === x2) ||
    (aMov === '<' && --x2 === x2)) && 
    (positions[`${x2}-${y2}`] = true);

});
console.log(Object.keys(positions).length);