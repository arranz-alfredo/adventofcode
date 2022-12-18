const input = require('./input.json');
const grid = input.data.map((aRow) => aRow.split('').map((aHeight) => parseInt(aHeight)));
let interiorVisible = 0;
const testVisible = (aRow, aCol) => {
    const vl = grid[aRow].slice(0, aCol).every((aTree) => aTree < grid[aRow][aCol]);
    const vr = grid[aRow].slice(aCol + 1).every((aTree) => aTree < grid[aRow][aCol]);
    const vt = grid.slice(0, aRow).every((aGridRow) => aGridRow[aCol] < grid[aRow][aCol]);
    const vb = grid.slice(aRow + 1).every((aGridRow) => aGridRow[aCol] < grid[aRow][aCol]);
    return vl || vr || vt || vb;
}
for (let row = 1; row <= grid.length - 2; row++) {
    for (let col = 1; col <= grid[0].length - 2; col++) {
        if (testVisible(row, col)) {
            interiorVisible++;
        }
    }
}
console.log((grid.length * 2) + ((grid[0].length - 2) * 2) + interiorVisible);