const input = require('./input.json');
input.data.sort((a, b) => a - b);

const getCost = (value) => Array(value).fill(0).reduce((prev, curr, idx) => prev + idx + 1, 0);

let cheapestCost = Number.MAX_SAFE_INTEGER;
for (let i = input.data[0]; i < input.data[input.data.length - 1]; i++) {
    const cost = input.data.reduce((prev, curr, idx) => prev + getCost(Math.abs(i - input.data[idx])), 0);
    if (cost < cheapestCost) {
        cheapestCost = cost;
    }
}
console.log(cheapestCost);
