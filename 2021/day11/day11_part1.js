const input = require('./input.json');
let grid = input.data.map(aRow => aRow.split('').map(anOct => parseInt(anOct)));

let flashes = 0;
const calculateNeighbours = (x, y) => {
    const minX = x > 0 ? x - 1 : x;
    const maxX = x < grid[0].length - 1 ? x + 1 : x;
    const minY = y > 0 ? y - 1 : y;
    const maxY = y < grid.length - 1 ? y + 1 : y;
    for (let i = minX; i <= maxX; i++) {
        for (let j = minY; j <= maxY; j++) {
            if (grid[j][i] !== -1) {
                grid[j][i] += 1;
                if (grid[j][i] === 10) {
                    grid[j][i] = -1;
                    flashes += 1;
                    calculateNeighbours(i, j);
                }    
            }
        }    
    }
};
for (let step = 0; step < 100; step++) {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] !== -1) {
                grid[y][x] += 1;
                if (grid[y][x] === 10) {
                    grid[y][x] = -1;
                    flashes += 1;
                    calculateNeighbours(x, y);
                }
            }
        }
    }
    grid = grid.map(aRow => aRow.map(anOct => anOct === -1 ? 0 : anOct));
}
console.log(flashes);
