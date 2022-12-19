const input = require('./input.json');
const head = [0, 0];
const tail = [0, 0];
const visitedPos = {};
input.data.forEach((aMovement) => {
    const movParts = aMovement.split(' ');
    for (let i = 0; i < parseInt(movParts[1]); i++) {
        if (movParts[0] === 'R') {
            head[1]++;
        } else if (movParts[0] === 'L') {
            head[1]--;
        } else if (movParts[0] === 'U') {
            head[0]--;
        } else if (movParts[0] === 'D') {
            head[0]++;
        }
        if (Math.abs(tail[1] - head[1]) === 2) {
            tail[1] = tail[1] > head[1] ? head[1] + 1 : head[1] - 1;
            tail[0] = head[0];
        } else if (Math.abs(tail[0] - head[0]) === 2) {
            tail[0] = tail[0] > head[0] ? head[0] + 1 : head[0] - 1;
            tail[1] = head[1];
        }
        visitedPos[tail[0] + '_' + tail[1]] = true;
    }
});
console.log(Object.keys(visitedPos).length);