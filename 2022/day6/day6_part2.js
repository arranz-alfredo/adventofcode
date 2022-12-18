const input = require('./input.json');
const test = (sequence) => sequence.split('').reduce((prev, curr, idx) => {
    return prev && (idx === sequence.length - 1 || sequence.substring(idx + 1).indexOf(curr) === -1)
}, true);
const pos = input.data.split('').findIndex((aLetter, idx) => 
    test(input.data.substring(idx, idx + 14))
);
console.log(pos + 14);