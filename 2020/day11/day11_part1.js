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
        for(i = rowIdx - 1; i <= rowIdx + 1; i++) {
            if (i >= 0 && i < rowsCount) {
                for (j = colIdx - 1; j <= colIdx + 1; j++) {
                    if (j >= 0 && j < rowSize && (j !== colIdx || i !== rowIdx)) {
                        state[i * rowSize + j] === '#' && occupiedCount++;
                    }
                }
            }
        }
        if (aPosState === 'L' && occupiedCount === 0) {
            return '#';
        } else if (aPosState === '#' && occupiedCount >= 4) {
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