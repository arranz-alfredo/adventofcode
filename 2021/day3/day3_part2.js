const input = require('./input.json');

const getCount = (candidates, value, position) => candidates.reduce(
    (previousValue, currentValue, idx) => candidates[idx][position] === value ? previousValue + 1 : previousValue,
    0
);

let o2Candidates = [...input.data];
let idx = 0;
while (o2Candidates.length > 1) {
    const mostCommonValue = getCount(o2Candidates, '1', idx) < (o2Candidates.length / 2) ? '0' : '1';
    o2Candidates = o2Candidates.filter(aCandidate => aCandidate[idx] === mostCommonValue);
    idx += 1;
}
const o2Value = parseInt(o2Candidates[0], 2);

let co2Candidates = [...input.data];
idx = 0;
while (co2Candidates.length > 1) {
    const leastCommonValue = getCount(co2Candidates, '0', idx) > (co2Candidates.length / 2) ? '1' : '0';
    co2Candidates = co2Candidates.filter(aCandidate => aCandidate[idx] === leastCommonValue);
    idx += 1;
}
const co2Value = parseInt(co2Candidates[0], 2);
console.log(o2Value*co2Value);
