const input = require('./input.json');
const positions = { '0-0': true };
let x = y = 0;
input.data.split('').forEach(aMov => {
    ((aMov === '^' && ++y === y) ||
    (aMov === 'v' && --y === y) ||
    (aMov === '>' && ++x === x) ||
    (aMov === '<' && --x === x)) && 
    (positions[`${x}-${y}`] = true);
});
console.log(Object.keys(positions).length);