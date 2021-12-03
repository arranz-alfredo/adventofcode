const input = require('./input.json');
const counter = Array(input.data[0].length).fill(0);
input.data.forEach(aRow => {
    aRow.split('').forEach((aBinaryData, idx) => {
        counter[idx] = (aBinaryData === '1' ? counter[idx] + 1 : counter[idx]);
    });
});
const gamma = parseInt(counter.map(aCount => aCount > input.data.length / 2 ? '1' : '0').join(''), 2);
const epsilon = parseInt(counter.map(aCount => aCount < input.data.length / 2 ? '1' : '0').join(''), 2);
console.log(gamma*epsilon);
