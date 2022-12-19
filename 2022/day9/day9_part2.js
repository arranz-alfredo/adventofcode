const input = require('./input.json');
const rope = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
]
const visitedPos = {};
input.data.forEach((aMovement, idx) => {
    const movParts = aMovement.split(' ');
    for (let i = 0; i < parseInt(movParts[1]); i++) {
        if (movParts[0] === 'R') {
            rope[0][1]++;
        } else if (movParts[0] === 'L') {
            rope[0][1]--;
        } else if (movParts[0] === 'U') {
            rope[0][0]--;
        } else if (movParts[0] === 'D') {
            rope[0][0]++;
        }
        for (let j = 1; j <= 9; j++) {
            if (Math.abs(rope[j][1] - rope[j - 1][1]) === 2 && Math.abs(rope[j][0] - rope[j - 1][0]) === 2) {
                rope[j][1] = rope[j][1] > rope[j - 1][1] ? rope[j - 1][1] + 1 : rope[j - 1][1] - 1;
                rope[j][0] = rope[j][0] > rope[j - 1][0] ? rope[j - 1][0] + 1 : rope[j - 1][0] - 1;
            } else if (Math.abs(rope[j][1] - rope[j - 1][1]) === 2) {
                rope[j][1] = rope[j][1] > rope[j - 1][1] ? rope[j - 1][1] + 1 : rope[j - 1][1] - 1;
                rope[j][0] = rope[j - 1][0];
            } else if (Math.abs(rope[j][0] - rope[j - 1][0]) === 2) {
                rope[j][0] = rope[j][0] > rope[j - 1][0] ? rope[j - 1][0] + 1 : rope[j - 1][0] - 1;
                rope[j][1] = rope[j - 1][1];
            }
        }
        visitedPos[rope[9][0] + '_' + rope[9][1]] = true;
    }
});
console.log(Object.keys(visitedPos).length);