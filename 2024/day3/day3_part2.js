const input = require('./input.json');
const validMuls = input.data.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g) || [];
let enabled = true;
const res = validMuls.reduce((prev, curr) => {
    if (curr === 'do()') {
        enabled = true;
    } else if (curr === "don't()") {
        enabled = false;
    } else {
        if (enabled) {
            const numbers = curr.substring(4, curr.length - 1).split(',').map((aNum) => parseInt(aNum));
            return prev + (numbers[0] * numbers[1]);
        }
    }
    return prev;
}, 0);
console.log(res);