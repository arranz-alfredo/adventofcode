const input = require('./input.json');
const grid = [];
for (let i = 0; i < 1000; i++) {
    grid.push(new Array(1000).fill(0));
}
const delta = (a, b) => {
    const min = a < b ? a : b;
    return new Array(Math.abs(a - b) + 1).fill(min).map((aPos, idx) => aPos + idx);
}
input.data.forEach((aPath) => {
    const pathParts = aPath.split(' -> ');
    for (let i = 1; i < pathParts.length; i++) {
        const ori = pathParts[i - 1].split(',').map((aCoord) => parseInt(aCoord));
        const des = pathParts[i].split(',').map((aCoord) => parseInt(aCoord));
        if (ori[0] === des[0]) {
            delta(ori[1], des[1]).forEach((aPos) => { grid[aPos][ori[0]] = 1; });
        } else {
            delta(ori[0], des[0]).forEach((aPos) => { grid[ori[1]][aPos] = 1; });
        }
    }
});
const fall = (startX, startY) => {
    const stopRowIdx = grid.findIndex((aRow, idx) => idx >= startY && aRow[startX] === 1);
    if (stopRowIdx === -1) {
        return null;
    }
    if (grid[stopRowIdx][startX - 1] === 0) {
        return fall(startX - 1, stopRowIdx)
    } else if (grid[stopRowIdx][startX + 1] === 0) {
        return fall(startX + 1, stopRowIdx)
    } else {
        return [startX, stopRowIdx - 1];
    }
};
let units = 0;
let endlessFall = false;
while (!endlessFall) {
    const endPos = fall(500, 0);
    if (endPos === null) {
        endlessFall = true;
    } else {
        grid[endPos[1]][endPos[0]] = 1;
        units++;
    }
}
console.log(units);