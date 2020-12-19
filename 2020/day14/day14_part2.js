const input = require('./input.json');
const mem = {};
let mask = null;
input.data.forEach(aRow => {
    let parts = aRow.split(' ');
    if (parts[0] === 'mask') {
        mask = parts[2];
    } else {
        allMemPos = [parseInt(parts[0].substring(4, parts[0].length - 1), 10).toString(2).padStart(36, 0)];
        for(let i = 0; i < mask.length; i++) {
            if (mask[i] === '1') {
                allMemPos = allMemPos.map(aMemPos => aMemPos.substring(0, i) + '1' + aMemPos.substring(i + 1));
            } else if (mask[i] === 'X') {
                newMemPos = [];
                allMemPos.forEach(aMemPos => {
                    auxMemPos0 = aMemPos.substring(0, i) + '0' + aMemPos.substring(i + 1);
                    auxMemPos1 = aMemPos.substring(0, i) + '1' + aMemPos.substring(i + 1);
                    newMemPos.push(auxMemPos0);
                    newMemPos.push(auxMemPos1);
                });
                allMemPos = [...newMemPos];
            }
        }
        allMemPos.forEach(aMemPos => {
            mem[parseInt(aMemPos, 2)] = parseInt(parts[2], 10);
        });
    }
});
const reducer = (accumulator, currentValue) => {
    return accumulator + mem[currentValue]
};
const sum = Object.keys(mem).reduce(reducer, 0);
console.log(sum);