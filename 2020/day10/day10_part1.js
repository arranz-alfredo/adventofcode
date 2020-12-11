const input = require('./input.json');
adapters = input.data.map(str => parseInt(str)).sort((a, b) => a - b);
diff = { 1: 0, 3: 1 };
diff[adapters[0]]++;
for(let i = 1; i < adapters.length; i++) {
    diff[adapters[i] - adapters[i - 1]]++;
}
console.log(diff[1] * diff[3]);