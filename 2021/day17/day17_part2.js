const input = require('./input.json');
const [[xMin, xMax], [yMin, yMax]] = input.data.split(': ')[1].split(', ').map(aRange => aRange.split('=')[1].split('..').map(aValue => parseInt(aValue)));

let value = 0;
let minVX = 0;
while (value < xMin) {
    minVX += 1;
    value += minVX;
}

const testVelocity = (vx, vy) => {
    let posX = 0;
    let posY = 0;
    while (posX <= xMax && posY >= yMin) {
        posX += vx;
        posY += vy;
        if (posX >= xMin && posX <= xMax && posY >= yMin && posY <= yMax) {
            return true;
        }
        if (vx === 0 && posX < xMin) {
            return false;
        }
        vx = (vx === 0 ? 0 : vx - 1);
        vy -= 1;
    }
    return false;
};

let hits = 0
for (let dx = minVX; dx <= xMax + 1; dx++) {
    for (let dy = -110; dy < 110; dy++) {
        const test = testVelocity(dx, dy);
        hits += test ? 1 : 0;
    }    
}
console.log(hits);