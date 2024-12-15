const input = require('./input.json');
const leftList = [];
const rightList = [];
input.data.forEach((aRow) => {
    leftList.push(aRow[0]);
    rightList.push(aRow[1]);
});
const distance = leftList.reduce((prev, curr, idx) => {
    return prev + (curr * rightList.filter((anId) => anId === curr).length);
}, 0);
console.log(distance);