const input = require('./input.json');
let waypointOffsets = {
    x: 10,
    y: 1
};
let x = y = 0;
input.data.forEach(anInstruction => {
    const value = parseInt(anInstruction.substring(1), 10);
    if (anInstruction[0] === 'L' || anInstruction[0] === 'R') {
        if (value === 180) {
            waypointOffsets.x *= -1;
            waypointOffsets.y *= -1;
        } else {
            waypointOffsets = {
                x: waypointOffsets.y * (anInstruction === 'L90' || anInstruction === 'R270' ? -1 : 1),
                y: waypointOffsets.x * (anInstruction === 'L90' || anInstruction === 'R270' ? 1 : -1)
            };
        }
    } else {
        switch(anInstruction[0]) {
            case 'F': 
                x += waypointOffsets.x * value;
                y += waypointOffsets.y * value;
                break;
            case 'N': waypointOffsets.y += value; break;
            case 'S': waypointOffsets.y -= value; break;
            case 'E': waypointOffsets.x += value; break;
            case 'W': waypointOffsets.x -= value; break;
        }
    }
});
console.log(Math.abs(x) + Math.abs(y));