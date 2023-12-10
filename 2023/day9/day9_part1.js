const input = require('./input.json');
let sum = 0;
input.data.forEach((aRow) => {
    let numbers = aRow.split(' ').map((strNum) => parseInt(strNum));
    const lastNumbers = [];
    while(numbers.some((aNumber) => aNumber !== 0)) {
        lastNumbers.unshift(numbers[numbers.length - 1]);
        const auxNumbers = [];
        for (let i = 1; i < numbers.length; i++) {
            auxNumbers.push(numbers[i] - numbers[i - 1]);
        }
        numbers = auxNumbers;
    }
    sum += lastNumbers.reduce((prev, curr) => prev + curr, 0);
});
console.log(sum);