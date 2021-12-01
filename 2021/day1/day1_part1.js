const input = require('./input.json');
const result = input.data.reduce(
    (previousValue, currentValue, currentIndex) => previousValue + (currentIndex > 0 && input.data[currentIndex] > input.data[currentIndex - 1] ? 1 : 0),
    0
);
console.log(result);
