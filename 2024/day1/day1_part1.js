const input = require('./input.json');
const leftList = [];
const rightList = [];
input.data.forEach((aRow) => {
    leftList.push(aRow[0]);
    rightList.push(aRow[1]);
});
leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);
const distance = leftList.reduce((prev, curr, idx) => {
    return prev + Math.abs(curr - rightList[idx]);
}, 0);
console.log(distance);