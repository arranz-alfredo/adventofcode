const input = require('./input.json');
let sum = 0;
input.data.forEach((aRow) => {
    const digits = aRow.split('').filter((aChar) => aChar >= '0' && aChar <= '9');
    sum += parseInt(digits[0] + digits[digits.length - 1]);
});
console.log(sum);