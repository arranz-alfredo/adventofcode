const input = require('./input.json');
const positions = input.data.map(aRow => aRow.split('').map(aValue => parseInt(aValue)));
const lowPoints = [];
for (let y = 0; y < positions.length; y++) {
    for (let x = 0; x < positions[y].length; x++) {
        if (
            (y === 0 || positions[y][x] < positions[y - 1][x]) &&
            (y === positions.length - 1 || positions[y][x] < positions[y + 1][x]) &&
            (x === 0 || positions[y][x] < positions[y][x - 1]) &&
            (x === positions[y].length - 1 || positions[y][x] < positions[y][x + 1])
        ) {
            lowPoints.push([y, x]);
        }
    }
}


const getBasinSize = (pos) => {
    let count = 0;
    let thePos = [pos];
    const dicCountedPositions = {};
    const dicProcessedPositions = {};
    while (thePos.length > 0) {
        const auxPos = [];
        thePos.forEach(([y, x]) => {
            if (!dicProcessedPositions[`${y},${x}`]) {
                if (y > 0 && positions[y - 1][x] !== 9 && !dicCountedPositions[`${y - 1},${x}`]) {
                    count += 1;
                    dicCountedPositions[`${y - 1},${x}`] = true;
                    auxPos.push([y - 1, x]);
                }
                if (y < positions.length - 1 && positions[y + 1][x] !== 9 && !dicCountedPositions[`${y + 1},${x}`]) {
                    count += 1;
                    dicCountedPositions[`${y + 1},${x}`] = true;
                    auxPos.push([y + 1, x]);
                }
                if (x > 0 && positions[y][x - 1] !== 9 && !dicCountedPositions[`${y},${x - 1}`]) {
                    count += 1;
                    dicCountedPositions[`${y},${x - 1}`] = true;
                    auxPos.push([y, x - 1]);
                }
                if (x < positions[y].length - 1 && positions[y][x + 1] !== 9 && !dicCountedPositions[`${y},${x + 1}`]) {
                    count += 1;
                    dicCountedPositions[`${y},${x + 1}`] = true;
                    auxPos.push([y, x + 1]);
                }
                dicProcessedPositions[`${y},${x}`] = true;
            }
        });
        thePos = auxPos;
    }
    return count;
}

const sizes = lowPoints.map(aLowPoint => getBasinSize(aLowPoint))
sizes.sort((a, b) => b - a);
console.log(sizes[0] * sizes[1] * sizes[2]);
