const input = require('./input.json');
const rows = [...input.data];
const numRows = input.data.length;
const numCols = input.data[0].length;
for (let x = 0; x < numCols; x++) {
    let vRow = '';
    for (let y = 0; y < numRows; y++) {
        vRow += input.data[y][x];
    }
    rows.push(vRow);
}
for (let d = 0; d < numRows + numCols - 1; d++) {
    let diagRow1 = '';
    let diagRow2 = '';
    for (let y = 0; y < numRows; y++) {
        const col1 = d - y;
        const col2 = numCols - 1 - d + y;
        if (col1 >= 0 && col1 < numCols) {
            diagRow1 += input.data[y][col1];
        }
        if (col2 >= 0 && col2 < numCols) {
            diagRow2 += input.data[y][col2];
        }
    }
    if (diagRow1) rows.push(diagRow1);
    if (diagRow2) rows.push(diagRow2);
}
const res = rows.reduce((prev, curr) => {
    return prev + (curr.match(/(?=XMAS|SAMX)/g) || []).length;
}, 0);
console.log(res);
