const input = require('./input.json');
input.data.sort((a, b) => a - b);

let cheapestCost = Number.MAX_SAFE_INTEGER;
for (let i = input.data[0]; i < input.data[input.data.length - 1]; i++) {
    const cost = input.data.reduce((prev, curr, idx) => prev + Math.abs(i - input.data[idx]), 0);
    if (cost < cheapestCost) {
        cheapestCost = cost;
    }
}
console.log(cheapestCost);
