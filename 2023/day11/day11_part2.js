const input = require('./input.json');
const emptyRows = [];
const auxEmptyCols = (new Array(input.data[0].length)).fill(true);
const emptyCols = [];
const galaxyPos = [];
input.data.forEach((aRow, rowIdx) => {
    if (aRow.indexOf('#') === -1) {
        emptyRows.push(rowIdx);
    } else {
        aRow.split('').forEach((aTile, colIdx) => {
            if (aTile === '#') {
                auxEmptyCols[colIdx] = false;
                galaxyPos.push([colIdx, rowIdx]);
            }
        });
    }
});
auxEmptyCols.forEach((isEmpty, colIdx) => {
    if(isEmpty) {
        emptyCols.push(colIdx);
    }
});
let sum = 0;
for (let i = 0; i < galaxyPos.length - 1; i++) {
    for (let j = i + 1; j < galaxyPos.length; j++) {
        emptyColsBetween = emptyCols.filter((aCol) =>
            (aCol > galaxyPos[i][0] && aCol < galaxyPos[j][0]) ||
            (aCol > galaxyPos[j][0] && aCol < galaxyPos[i][0])
        ).length;
        emptyRowsBetween = emptyRows.filter((aRow) =>
            (aRow > galaxyPos[i][1] && aRow < galaxyPos[j][1]) ||
            (aRow > galaxyPos[j][1] && aRow < galaxyPos[i][1])
        ).length;
        sum += Math.abs(galaxyPos[i][0] - galaxyPos[j][0]) + (emptyColsBetween * 999999) +
                Math.abs(galaxyPos[i][1] - galaxyPos[j][1]) + (emptyRowsBetween * 999999);
    }
}
console.log(sum);