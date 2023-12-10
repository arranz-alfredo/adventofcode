const input = require('./input.json');
let sum = 0;
input.data.forEach((aRow) => {
    let numbers = aRow.split(' ').map((strNum) => parseInt(strNum));
    const firstNumbers = [];
    while(numbers.some((aNumber) => aNumber !== 0)) {
        firstNumbers.unshift(numbers[0]);
        const auxNumbers = [];
        for (let i = 1; i < numbers.length; i++) {
            auxNumbers.push(numbers[i] - numbers[i - 1]);
        }
        numbers = auxNumbers;
    }
    sum += firstNumbers.reduce((prev, curr) => curr - prev, 0);
});
console.log(sum);