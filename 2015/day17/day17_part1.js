const input = require('./input.json');
const maxComb = parseInt(Array(input.data.length).fill('1').join(''), 2);
let validCombs = 0;
for(let i = 1; i < maxComb; i++) {
    const mults = i.toString(2).padStart(input.data.length, '0').split('').map(aValue => parseInt(aValue));
    const liters = mults.reduce((prev, curr, idx) => prev + curr*input.data[idx], 0);
    validCombs = liters === 150 ? validCombs + 1 : validCombs; 
}
console.log(validCombs);