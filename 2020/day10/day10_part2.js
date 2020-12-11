const input = require('./input.json');
const adapters = [0, ...input.data.map(str => parseInt(str)).sort((a, b) => a - b)];
const groups = [];
currentGroupItems = [];
for (let i = 1; i < adapters.length - 1; i++) {
    if (adapters[i] - adapters[i - 1] === 1 && adapters[i + 1] - adapters[i] === 1) {
        currentGroupItems.push(adapters[i]);
    }
    else if (adapters[i + 1] - adapters[i] === 3) {
        if (currentGroupItems.length > 0) {
            groups.push([...currentGroupItems]);
        }
        currentGroupItems = [];
    }
}
if (currentGroupItems.length > 0) {
    groups.push([...currentGroupItems]);
}
const result = groups.reduce((t, v) => {
    return t * (v.length === 3 ? 7 : (v.length === 2 ? 4 : 2));
}, 1)
console.log(result);