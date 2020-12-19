const input = require('./input.json');
const mem = {};
let mask0High = null;
let mask0Low = null;
let mask1High = null;
let mask1Low = null;
input.data.forEach(aRow => {
    let parts = aRow.split(' ');
    if (parts[0] === 'mask') {
        mask0High = parseInt(parts[2].substring(0, 18).replace(/X/g, '1'), 2);
        mask0Low = parseInt(parts[2].substring(18).replace(/X/g, '1'), 2);
        mask1High = parseInt(parts[2].substring(0, 18).replace(/X/g, '0'), 2);
        mask1Low = parseInt(parts[2].substring(18).replace(/X/g, '0'), 2);
    } else {
        memPos = parts[0].substring(4, parts[0].length - 1);
        let value = parseInt(parts[2], 10);
        const valueHigh = parseInt(value.toString(2).padStart(36, '0').substring(0, 18), 2);
        const valueLow = parseInt(value.toString(2).padStart(36, '0').substring(18), 2);
        mem[memPos] = parseInt(((valueHigh & mask0High) | mask1High).toString(2).padStart(18, 0) + ((valueLow & mask0Low) | mask1Low).toString(2).padStart(18, 0), 2);
    }
});
const reducer = (accumulator, currentValue) => {
    return accumulator + mem[currentValue]
};
const sum = Object.keys(mem).reduce(reducer, 0);
console.log(sum);