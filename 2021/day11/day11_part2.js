const input = require('./input.json');
let grid = input.data.map(aRow => aRow.split('').map(anOct => parseInt(anOct)));
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
                    calculateNeighbours(i, j);
                }
            }
        }
    }
};
let step = 1;
let stop = false;
while (!stop) {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] !== -1) {
                grid[y][x] += 1;
                if (grid[y][x] === 10) {
                    grid[y][x] = -1;
                    calculateNeighbours(x, y);
                }
            }
        }
    }
    const flashes = grid.reduce((prev, curr) => prev + curr.reduce((prev2, curr2) => prev2 + (curr2 === -1 ? 1 : 0), 0), 0);
    if (flashes === 100) {
        stop = true;
    } else {
        grid = grid.map(aRow => aRow.map(anOct => anOct === -1 ? 0 : anOct));
        step += 1;
    }
}
console.log(step);