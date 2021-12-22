const input = require('./input.json');
let grid = input.data.map(aRow => aRow.split('').map(aValue => aValue === '#'));

for (let step = 0; step < 100; step++) {
    grid = grid.map((aRow, idxY) => aRow.map((isOn, idxX) => {
        let onNeighbours = 0;
        for (let y = idxY - 1; y <= idxY + 1; y++) {
            for (let x = idxX - 1; x <= idxX + 1; x++) {
                if (y >= 0 && y < grid.length && x >= 0 && x < aRow.length && (y !== idxY || x !== idxX) && grid[y][x]) {
                    onNeighbours += 1
                }
            }            
        }

        if (isOn) {
            return onNeighbours === 2 || onNeighbours === 3;
        } else {
            return onNeighbours === 3;
        }
    }));
}
console.log(grid.reduce((prev, curr) => prev + curr.reduce((prev2, curr2) => prev2 + (curr2 ? 1 : 0), 0), 0));