const input = require('./input.json');
const sizeX = input.data[0].length;
const sizeY = input.data.length;
const cycles = 6;
let currentCycle = 0
let state = {
    0: {
        0: {}
    }
}
input.data.forEach((row, idxY) => {
    state[0][0][idxY] = row.split('').map(value => value === '#')
});
const getNewState = (x, y, z, w) => {
    activeNeighbors = 0;
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            for (let k = z - 1; k <= z + 1; k++) {
                for (let l = w - 1; l <= w + 1; l++) {
                    if ((i !== x || j !== y || k !== z || l !== w) &&
                        state[l] != null && state[l][k] != null && state[l][k][j] != null &&
                        state[l][k][j][i]) {
                        activeNeighbors++;
                    }
                }
            }        
        }
    }
    const currentState = state[w] != null && state[w][z] != null && state[w][z][y] != null && state[w][z][y][x] === true;
    if(currentState && (activeNeighbors < 2 || activeNeighbors > 3)) {
        return false;
    } else if(!currentState && activeNeighbors === 3) {
        return true
    }
    return currentState;
}
for (currentCycle = 0; currentCycle < cycles; currentCycle++) {
    const newState = {};
    for (w = -currentCycle - 1; w <= currentCycle + 1; w++) {
        newState[w] = {};
        for (z = -currentCycle - 1; z <= currentCycle + 1; z++) {
            newState[w][z] = {};
            for (y = -currentCycle - 1; y < sizeY + currentCycle + 1; y++) {
                newState[w][z][y] = [];
                for(x = -1; x < sizeX + (2 * currentCycle) + 1; x++) {
                    newState[w][z][y].push(getNewState(x, y, z, w));
                }
            }
        }
    }
    state = newState;
}
let actives = 0;
Object.keys(state).forEach(aW => {
    Object.keys(state[aW]).forEach(aZ => {
        Object.keys(state[aW][aZ]).forEach(aY => {
            state[aW][aZ][aY].forEach(value => {
                value && actives++;
            })
        })
    })
})
console.log(actives);