const input = require('./input.json');
let maxs = [0, 0, 0];
let curr = 0;
input.data.forEach((aRow) => {
    if (aRow === '') {
        if (curr > maxs[0]) {
            maxs.splice(0, 1, curr);
            maxs.sort();
        }
        curr = 0;
    } else {
        curr += parseInt(aRow);
    }
});
if (curr > maxs[0]) {
    maxs.splice(0, 1, curr);
}
console.log(maxs[0] + maxs[1] + maxs[2]);