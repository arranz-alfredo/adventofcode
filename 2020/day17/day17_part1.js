const input = require('./input.json');
const sizeX = input.data[0].length;
const sizeY = input.data.length;
const cycles = 6;
let currentCycle = 0
let state = {
    0: {}
}
input.data.forEach((row, idxY) => {
    state[0][idxY] = row.split('').map(value => value === '#')
});
const getNewState = (x, y, z) => {
    activeNeighbors = 0;
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            for (let k = z - 1; k <= z + 1; k++) {
                if ((i !== x || j !== y || k !== z) &&
                    state[k] != null && state[k][j] != null &&
                    state[k][j][i]) {
                    activeNeighbors++;
                }
            }        
        }
    }
    const currentState = state[z] != null && state[z][y] != null && state[z][y][x] === true;
    if(currentState && (activeNeighbors < 2 || activeNeighbors > 3)) {
        return false;
    } else if(!currentState && activeNeighbors === 3) {
        return true
    }
    return currentState;
}
for (currentCycle = 0; currentCycle < cycles; currentCycle++) {
    const newState = {};
    for (z = -currentCycle - 1; z <= currentCycle + 1; z++) {
        newState[z] = {};
        for (y = -currentCycle - 1; y < sizeY + currentCycle + 1; y++) {
            newState[z][y] = [];
            for(x = -1; x < sizeX + (2 * currentCycle) + 1; x++) {
                newState[z][y].push(getNewState(x, y, z));
            }
        }
    }
    state = newState;
}
let actives = 0;
Object.keys(state).forEach(aZ => {
    Object.keys(state[aZ]).forEach(aY => {
        state[aZ][aY].forEach(value => {
            value && actives++;
        })
    })
})
console.log(actives);