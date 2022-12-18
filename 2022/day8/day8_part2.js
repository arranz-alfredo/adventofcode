const input = require('./input.json');
const grid = input.data.map((aRow) => aRow.split('').map((aHeight) => parseInt(aHeight)));
// console.log(grid);
const scenicScore = (aRow, aCol) => {
    const pl = grid[aRow].slice(0, aCol).reverse().findIndex((aTree) => aTree >= grid[aRow][aCol]);
    const sl = pl === -1 ? aCol : pl + 1;
    const pr = grid[aRow].slice(aCol + 1).findIndex((aTree) => aTree >= grid[aRow][aCol]);
    const sr = pr === -1 ? grid[aRow].length - (aCol + 1) : pr + 1;
    const pt = grid.slice(0, aRow).reverse().findIndex((aGridRow) => aGridRow[aCol] >= grid[aRow][aCol])
    const st = pt === - 1 ? aRow : pt + 1;
    const pb = grid.slice(aRow + 1).findIndex((aGridRow) => aGridRow[aCol] >= grid[aRow][aCol])
    const sb = pb === -1 ? grid.length - (aRow + 1) : pb + 1;
    return sl * sr * st * sb;
}
let max = 0;
for (let row = 1; row < grid.length - 1; row++) {
    for (let col = 1; col < grid[0].length - 1; col++) {
        const ss = scenicScore(row, col);
        if (ss > max) {
            max = ss;
        }
    }
}
console.log(max);