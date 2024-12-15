const input = require('./input.json');
const validMuls = input.data.match(/mul\(\d{1,3},\d{1,3}\)/g) || [];
const res = validMuls.reduce((prev, curr) => {
    const numbers = curr.substring(4, curr.length - 1).split(',').map((aNum) => parseInt(aNum));
    return prev + (numbers[0] * numbers[1]);
}, 0);
console.log(res);