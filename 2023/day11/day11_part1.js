const input = require('./input.json');
const expandedUniverse = [];
const emptyCols = (new Array(input.data[0].length)).fill(true);
input.data.forEach((aRow) => {
    expandedUniverse.push(aRow);
    if (aRow.indexOf('#') === -1) {
        expandedUniverse.push(aRow);
    } else {
        aRow.split('').forEach((aTile, xPos) => {
            if (aTile === '#') {
                emptyCols[xPos] = false;
            }
        });
    }
});
for (let colIdx = emptyCols.length - 1; colIdx >= 0; colIdx--) {
    if(emptyCols[colIdx]) {
        expandedUniverse.forEach((aRow, rowIdx) => {
            const newRow = aRow.substring(0, colIdx) + '.' + aRow.substring(colIdx);
            expandedUniverse[rowIdx] = newRow;
        });
    }
}
const galaxyPos = [];
expandedUniverse.forEach((aRow, rowIdx) => {
    aRow.split('').forEach((aTile, colIdx) => {
        if (aTile === '#') {
            galaxyPos.push([colIdx, rowIdx]);
        }
    });
});
let sum = 0;
for (let i = 0; i < galaxyPos.length - 1; i++) {
    for (let j = i + 1; j < galaxyPos.length; j++) {
        sum += (Math.abs(galaxyPos[i][0] - galaxyPos[j][0]) + Math.abs(galaxyPos[i][1] - galaxyPos[j][1]));
    }
}
console.log(sum);