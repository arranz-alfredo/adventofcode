const input = require('./input.json');
const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
const xLength = input.data[0].length;
let result = 1;
slopes.forEach(aSlope => {
    const treeRows = input.data.filter((aRow, idxRow) => {
        return idxRow % aSlope[1] === 0 && aRow[((aSlope[0] * idxRow) / aSlope[1]) % xLength] === '#';
    });
    result *= treeRows.length;
});
console.log(result);