const input = require('./input.json');
const startY = input.data.findIndex((aRow) => aRow.indexOf('S') >= 0);
const startX = input.data[startY].indexOf('S');
let currentX = startX;
let currentY = startY;
let prevX = startX;
let prevY = startY;
if (input.data[currentY - 1][currentX] === '|' ||
    input.data[currentY - 1][currentX] === '7' ||
    input.data[currentY - 1][currentX] === 'F') {
        currentY = currentY - 1;
} else if (input.data[currentY + 1][currentX] === '|' ||
    input.data[currentY + 1][currentX] === 'J' ||
    input.data[currentY + 1][currentX] === 'L') {
        currentY = currentY + 1;
} else if (input.data[currentY][currentX - 1] === '-' ||
input.data[currentY][currentX - 1] === 'L' ||
input.data[currentY][currentX - 1] === 'F') {
    currentX = currentX - 1;
} else {
    currentX = currentX + 1;
}
let steps = 1;
while(currentX !== startX || currentY !== startY) {
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
    steps++;
}
console.log(steps / 2);
