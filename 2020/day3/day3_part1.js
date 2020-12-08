const input = require('./input.json');
const xLength = input.data[0].length;
const treeRows = input.data.filter((aRow, idxRow) => {
    return aRow[(3 * idxRow) % xLength] === '#';
})
console.log(treeRows.length);