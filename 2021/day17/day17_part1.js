const input = require('./input.json');
const [[xMin, xMax], [yMin, yMax]] = input.data.split(': ')[1].split(', ').map(aRange => aRange.split('=')[1].split('..').map(aValue => parseInt(aValue)));

let value = 0;
let minVX = 0;
while (value < xMin) {
    minVX += 1;
    value += minVX;
}

const testVelocity = (vx, vy) => {
    let maxHeight = 0;
    let posX = 0;
    let posY = 0;
    while (posX <= xMax && posY >= yMin) {
        posX += vx;
        posY += vy;
        if (posY > maxHeight) {
            maxHeight = posY;
        }
        if (posX >= xMin && posX <= xMax && posY >= yMin && posY <= yMax) {
            return maxHeight;
        }
        if (vx === 0 && posX < xMin) {
            return false;
        }        
        vx = (vx === 0 ? 0 : vx - 1);
        vy -= 1;
    }
    return -1;
};

let best = 0
for (let dx = minVX; dx < xMax; dx++) {
    for (let dy = 1; dy < 110; dy++) {
        const res = testVelocity(dx, dy);
        best = res > best ? res : best;
    }    
}
console.log(best);