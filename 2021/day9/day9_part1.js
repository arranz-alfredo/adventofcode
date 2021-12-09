const input = require('./input.json');
const positions = input.data.map(aRow => aRow.split('').map(aValue => parseInt(aValue)));
const lowPoints = [];
for (let y = 0; y < positions.length; y++) {
    for(let x = 0; x < positions[y].length; x++) {
        if (
            (y === 0 || positions[y][x] < positions[y-1][x]) &&
            (y === positions.length - 1 || positions[y][x] < positions[y+1][x]) && 
            (x === 0 || positions[y][x] < positions[y][x-1]) &&
            (x === positions[y].length - 1 || positions[y][x] < positions[y][x+1])
        ) {
            lowPoints.push(positions[y][x]);
        }
    }
}
console.log(lowPoints.reduce((prev, curr) => prev + curr + 1, 0));
