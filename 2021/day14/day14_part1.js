const input = require('./input.json');
const rules = {};
input.data.slice(2).forEach(aRow => {
    const rowParts = aRow.split(' -> ');
    rules[rowParts[0]] = rowParts[1];
});
let polymer = input.data[0];
for (let step = 0; step < 10; step++) {
    let newPolymer = '';
    for (let idx = 0; idx < polymer.length - 1; idx++) {
        const pair = polymer.substring(idx, idx + 2);
        if (rules[pair] != null) {
            newPolymer += (idx === 0 ? polymer[idx] : '') + rules[pair] + polymer[idx + 1];
        } else {
            newPolymer += (idx === 0 ? polymer[idx] : '') + polymer[idx + 1];
        }
    }
    polymer = newPolymer;
}
const dicCount = {};
polymer.split('').forEach(anElem => {
    if (dicCount[anElem] != null) {
        dicCount[anElem] += 1;
    } else {
        dicCount[anElem] = 1;
    }
});
const most = Object.keys(dicCount).reduce((prev, curr) => prev = (prev == null || dicCount[prev] < dicCount[curr]) ? curr : prev, null);
const least = Object.keys(dicCount).reduce((prev, curr) => prev = (prev == null || dicCount[prev] > dicCount[curr]) ? curr : prev, null);
console.log(dicCount[most] - dicCount[least]);
