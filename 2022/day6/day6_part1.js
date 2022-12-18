const input = require('./input.json');
const pos = input.data.split('').findIndex((aLetter, idx) => {
    const sequence = input.data.substring(idx - 3, idx + 1);
    return idx >= 3 &&
        sequence[0] !== sequence[1] && sequence[0] !== sequence[2] && sequence[0] !== sequence[3] &&
        sequence[1] !== sequence[2] && sequence[1] !== sequence[3] &&
        sequence[2] !== sequence[3];
});
console.log(pos + 1);