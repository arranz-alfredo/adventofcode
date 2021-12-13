const input = require('./input.json');
let coords = [];
let stop = false;
for (let y = 0; y < input.data.length && !stop; y++) {
    if (input.data[y] === '') {
        stop = true;
    } else {
        coords.push(input.data[y].split(',').map(aValue => parseInt(aValue)));
    }
}

const fold = (coord, value) => {
    let newCoords = [];
    if (coord === 'x') {
        const coordsToMove = coords.filter(aCoord => aCoord[0] > value);
        newCoords = coords.filter(aCoord => aCoord[0] <= value);
        coordsToMove.forEach(aCoord => {
            const newCoord = [value - (aCoord[0] - value), aCoord[1]];
            if (!newCoords.find(aCoordAux => aCoordAux[0] === newCoord[0] && aCoordAux[1] === newCoord[1])) {
                newCoords.push(newCoord);
            }
        });
    } else {
        const coordsToMove = coords.filter(aCoord => aCoord[1] > value);
        newCoords = coords.filter(aCoord => aCoord[1] <= value);
        coordsToMove.forEach(aCoord => {
            const newCoord = [aCoord[0], value - (aCoord[1] - value)];
            if (!newCoords.find(aCoordAux => aCoordAux[0] === newCoord[0] && aCoordAux[1] === newCoord[1])) {
                newCoords.push(newCoord);
            }
        });
    }
    coords = [...newCoords];
}

const foldInstr = input.data[coords.length + 1].split(' ')[2].split('=');
fold(foldInstr[0], parseInt(foldInstr[1]));
console.log(coords.length);
