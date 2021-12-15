const input = require('./input.json');
const smallGrid = input.data.map(aRow => aRow.split('').map(aValue => parseInt(aValue)));
const grid = Array(smallGrid.length * 5).fill(null);
grid.forEach((aPos, idx) => {
    grid[idx] = Array(smallGrid[0].length * 5).fill(null);
});
smallGrid.forEach((aRow, idxY) => {
    aRow.forEach((aValue, idxX) => {
        for(let i = 0; i < 5; i++) {
            for(let j = 0; j < 5; j++) {
                grid[i * smallGrid.length + idxY][j * aRow.length + idxX] = (aValue + j + i) > 9 ? ((aValue + j + i) % 10) + 1 : aValue + j + i;
            }
        }
    });
});

grid[0][0] = 0;
const minDistances = Array(grid.length).fill(null);
minDistances.forEach((aDistance, idx) => {
    minDistances[idx] = Array(grid[0].length).fill(null);
});

const calculate = (idxX, idxY, currentDistance) => {
    const recalculations = [[idxX, idxY, currentDistance]];
    const addRecalculation = (x, y, d) => {
        const recIdx = recalculations.findIndex(aRec => aRec[0] === x && aRec[1] === y);
        if (recIdx >= 0) {
            if(recalculations[recIdx][2] > d) {
                recalculations[recIdx][2] = d;
            }
        } else {
            recalculations.push([x, y, d]);
        }
    }

    while (recalculations.length > 0) {
        const [x, y, dist] = recalculations[0];
        if (minDistances[y][x] == null || minDistances[y][x] > dist + grid[y][x]) {
            const newMinDistance = dist + grid[y][x];
            minDistances[y][x] = newMinDistance;
            if (x > 0) { addRecalculation(x - 1, y, newMinDistance); }
            if (x < minDistances[y].length - 1) { addRecalculation(x + 1, y, newMinDistance); }
            if (y > 0) { addRecalculation(x, y - 1, newMinDistance); }
            if (y < minDistances.length - 1) { addRecalculation(x, y + 1, newMinDistance); }
        }
        recalculations.splice(0, 1);
    }
};

calculate(0, 0, 0);
console.log(minDistances[minDistances.length - 1][minDistances[0].length - 1]);
