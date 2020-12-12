const input = require('./input.json');
const progressFactor = {
    0: { x: 1, y: 0 },
    90: { x: 0, y: 1 },
    180: { x: -1, y: 0 },
    270: { x: 0, y: -1 }
};
let x = y = currentFacing = 0;
input.data.forEach(anInstruction => {
    const value = parseInt(anInstruction.substring(1), 10);
    switch(anInstruction[0]) {
        case 'L': currentFacing = (currentFacing + value) % 360; break;
        case 'R': currentFacing = (currentFacing + 360 - value) % 360; break;
        case 'F':
            x += progressFactor[currentFacing].x * value;
            y += progressFactor[currentFacing].y * value;
            break;
        case 'N': y += value; break;
        case 'S': y -= value; break;
        case 'E': x += value; break;
        case 'W': x -= value; break;
    }
});
console.log(Math.abs(x) + Math.abs(y));