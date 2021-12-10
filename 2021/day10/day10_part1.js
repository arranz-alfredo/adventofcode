const input = require('./input.json');
const dic = {
    ')': ['(', 3],
    ']': ['[', 57],
    '}': ['{', 1197],
    '>': ['<', 25137]
};
let score = 0;
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
    if (corrupted) {
        score += dic[aRow[idx]][1];
    }
});

console.log(score);