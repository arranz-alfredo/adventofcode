const input = require('./input.json');
let max = 0;
let curr = 0;
input.data.forEach((aRow) => {
    if (aRow === '') {
        if (curr > max) {
            max = curr;
        }
        curr = 0;
    } else {
        curr += parseInt(aRow);
    }
})
console.log(curr > max ? curr : max);