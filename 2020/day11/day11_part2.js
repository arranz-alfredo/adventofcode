const input = require('./input.json');
let state = '';
let newState = '';
const rowSize = input.data[0].length;
let rowsCount = 0;
input.data.forEach(aRow => {
    state += aRow;
    rowsCount++;
});

while(state !== newState) {
    newState = [...state].map((aPosState, idx) => {
        if(aPosState === '.') { return '.' };
        let occupiedCount = 0;
        rowIdx = Math.floor(idx / rowSize);
        colIdx = idx % rowSize;

        for(let [i, j] = [rowIdx - 1, colIdx - 1]; i >= 0 && j >= 0; i--, j--) {
            if(state[i * rowSize + j] !== '.') {
                state[i * rowSize + j] === '#' && occupiedCount++;
                break;
            }
        }
        for(let [i, j] = [rowIdx - 1, colIdx + 1]; i >= 0 && j < rowSize; i--, j++) {
            if(state[i * rowSize + j] !== '.') {
                state[i * rowSize + j] === '#' && occupiedCount++;
                break;
            }
        }
        for(let [i, j] = [rowIdx + 1, colIdx + 1]; i < rowsCount && j < rowSize; i++, j++) {
            if(state[i * rowSize + j] !== '.') {
                state[i * rowSize + j] === '#' && occupiedCount++;
                break;
            }
        }
        for(let [i, j] = [rowIdx + 1, colIdx - 1]; i < rowsCount && j >= 0; i++, j--) {
            if(state[i * rowSize + j] !== '.') {
                state[i * rowSize + j] === '#' && occupiedCount++;
                break;
            }
        }
        for(let i = rowIdx - 1; i >= 0; i--) {
            if(state[i * rowSize + colIdx] !== '.') {
                state[i * rowSize + colIdx] === '#' && occupiedCount++;
                break;
            }
        }
        for(let i = rowIdx + 1; i < rowsCount; i++) {
            if(state[i * rowSize + colIdx] !== '.') {
                state[i * rowSize + colIdx] === '#' && occupiedCount++;
                break;
            }
        }
        for(let j = colIdx - 1; j >= 0; j--) {
            if(state[rowIdx * rowSize + j] !== '.') {
                state[rowIdx * rowSize + j] === '#' && occupiedCount++;
                break;
            }
        }
        for(let j = colIdx + 1; j < rowSize; j++) {
            if(state[rowIdx * rowSize + j] !== '.') {
                state[rowIdx * rowSize + j] === '#' && occupiedCount++;
                break;
            }
        }

        if (aPosState === 'L' && occupiedCount === 0) {
            return '#';
        } else if (aPosState === '#' && occupiedCount >= 5) {
            return 'L';
        } else {
            return aPosState;
        }
    }).join('');
    if(state !== newState) {
        state = newState;
        newState = '';
    }
}
console.log([...state].filter(aPosState => aPosState === '#').length);