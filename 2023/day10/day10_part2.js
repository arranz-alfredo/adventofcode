const input = require('./input.json');
const startY = input.data.findIndex((aRow) => aRow.indexOf('S') >= 0);
const startX = input.data[startY].indexOf('S');
let currentX = startX;
let currentY = startY;
let prevX = startX;
let prevY = startY;
let toUp = toDown = toRight = toLeft = false;
let fromUp = fromDown = fromRight = fromLeft = false;
if (currentY > 0 && (
    input.data[currentY - 1][currentX] === '|' ||
    input.data[currentY - 1][currentX] === '7' ||
    input.data[currentY - 1][currentX] === 'F')) {
    currentY = currentY - 1;
    toUp = true;
} else if (currentY < input.data.length - 1 && (
    input.data[currentY + 1][currentX] === '|' ||
    input.data[currentY + 1][currentX] === 'J' ||
    input.data[currentY + 1][currentX] === 'L')) {
    currentY = currentY + 1;
    toDown = true;
} else if (currentX > 0 && (
    input.data[currentY][currentX - 1] === '-' ||
    input.data[currentY][currentX - 1] === 'L' ||
    input.data[currentY][currentX - 1] === 'F')) {
    currentX = currentX - 1;
    toLeft = true;
} else {
    currentX = currentX + 1;
    toRight = true;
}
const loopTiles = {};
loopTiles[`${startX}_${startY}`] = true;
loopTiles[`${currentX}_${currentY}`] = true;
while (currentX !== startX || currentY !== startY) {
    if (input.data[currentY][currentX] === '|') {
        if (prevY === currentY - 1) { prevY = currentY; currentY++ }
        else { prevY = currentY; currentY-- }
    } else if (input.data[currentY][currentX] === '-') {
        if (prevX === currentX - 1) { prevX = currentX; currentX++ }
        else { prevX = currentX; currentX-- }
    } else if (input.data[currentY][currentX] === 'L') {
        if (prevY === currentY - 1) { prevY = currentY; currentX++ }
        else { prevX = currentX; currentY-- }
    } else if (input.data[currentY][currentX] === 'J') {
        if (prevY === currentY - 1) { prevY = currentY; currentX-- }
        else { prevX = currentX; currentY-- }
    } else if (input.data[currentY][currentX] === '7') {
        if (prevY === currentY + 1) { prevY = currentY; currentX-- }
        else { prevX = currentX; currentY++ }
    } else if (input.data[currentY][currentX] === 'F') {
        if (prevY === currentY + 1) { prevY = currentY; currentX++ }
        else { prevX = currentX; currentY++ }
    }
    loopTiles[`${currentX}_${currentY}`] = true;
}
if (prevY === currentY - 1) {
    fromUp = true;
} else if (prevY === currentY + 1) {
    fromDown = true;
} else if (prevX === currentX - 1) {
    fromLeft = true;
} else if (prevX === currentX + 1) {
    fromRight = true;
}
let inTiles = 0;
for (let yIdx = 1; yIdx < input.data.length - 1; yIdx++) {
    let isIn = false;
    let row = input.data[yIdx].replace('S', toUp || fromUp ? '|' : '-');
    for (let xIdx = 0; xIdx < row.length; xIdx++) {
        const pipePart = row[xIdx];
        if (loopTiles[`${xIdx}_${yIdx}`]) {
            if (['|','L','J'].indexOf(pipePart) >= 0) {
                isIn = !isIn;
            }
        } else if (isIn) {
            inTiles++;
        }
    }
}
console.log(inTiles);