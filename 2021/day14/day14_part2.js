const input = require('./input.json');
const rules = {};
input.data.slice(2).forEach(aRow => {
    const rowParts = aRow.split(' -> ');
    rules[rowParts[0]] = rowParts[1];
});
let pairs = {}
for (let idx = 0; idx < input.data[0].length - 1; idx++) {
    if(pairs[input.data[0].substring(idx, idx + 2)] != null) {
        pairs[input.data[0].substring(idx, idx + 2)] += 1;
    } else {
        pairs[input.data[0].substring(idx, idx + 2)] = 1;
    }
}
for (let step = 0; step < 40; step++) {
    let newPairs = {};
    Object.keys(pairs).forEach(aPair => {
        if (rules[aPair] != null) {
            if (newPairs[`${aPair[0]}${rules[aPair]}`] != null) {
                newPairs[`${aPair[0]}${rules[aPair]}`] += pairs[aPair];
            } else {
                newPairs[`${aPair[0]}${rules[aPair]}`] = pairs[aPair];
            }
            if (newPairs[`${rules[aPair]}${aPair[1]}`] != null) {
                newPairs[`${rules[aPair]}${aPair[1]}`] += pairs[aPair];
            } else {
                newPairs[`${rules[aPair]}${aPair[1]}`] = pairs[aPair];
            }
        } else {
            if (newPairs[aPair] != null) {
                newPairs[aPair] += pairs[aPair];
            } else {
                newPairs[aPair] = pairs[aPair];
            }
        }
    });
    pairs = { ...newPairs };
}
const dicCount = {};
Object.keys(pairs).forEach(aPair => {
    aPair.split('').forEach(anElem => {
        if (dicCount[anElem] != null) {
            dicCount[anElem] += pairs[aPair];
        } else {
            dicCount[anElem] = pairs[aPair];
        }
    })
});
let most = Object.keys(dicCount).reduce((prev, curr) => prev = (prev == null || dicCount[prev] < dicCount[curr]) ? curr : prev, null);
let least = Object.keys(dicCount).reduce((prev, curr) => prev = (prev == null || dicCount[prev] > dicCount[curr]) ? curr : prev, null);
const A = most === 'O' ? (dicCount[most] - 2) / 2 + 2 : dicCount[most] / 2;
const B = least === 'O' ? (dicCount[least] - 2) / 2 + 2 : dicCount[least] / 2;
console.log(A - B);
