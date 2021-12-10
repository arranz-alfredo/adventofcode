const input = require('./input.json');
const dic = {
    ')': ['(', 1],
    ']': ['[', 2],
    '}': ['{', 3],
    '>': ['<', 4]
};
const dic2 = { '(': ')', '[': ']', '{': '}', '<': '>'};
let scores = [];
input.data.forEach(aRow => {
    let corrupted = false;
    let idx = 1;
    while (idx < aRow.length && !corrupted) {
        if (dic[aRow[idx]] != null) {
            if (dic[aRow[idx]][0] === aRow[idx - 1]) {
                const parts = aRow.split('');
                parts.splice(idx - 1, 2);
                aRow = parts.join('');
                idx -= 1;
            } else {
                corrupted = true;
            }
        } else {
            idx += 1;
        }
    }
    if (!corrupted) {
        scores.push(aRow.split('').reverse().map(aChar => dic2[aChar]).reduce((prev, curr) => prev * 5 + dic[curr][1], 0));
    }
});
scores.sort((a, b) => a - b);
console.log(scores[Math.floor((scores.length - 1) / 2)]);