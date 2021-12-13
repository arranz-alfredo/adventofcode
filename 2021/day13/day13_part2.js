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

input.data.slice(coords.length + 1).forEach(anInstruction => {
    const foldInstr = anInstruction.split(' ')[2].split('=');
    fold(foldInstr[0], parseInt(foldInstr[1]));
});

let maxX = 0;
let maxY = 0;
const dicCoords = {};
coords.forEach(aCoord => {
    dicCoords[`${aCoord[0]},${aCoord[1]}`] = true;
    maxX = maxX < aCoord[0] ? aCoord[0] : maxX;
    maxY = maxY < aCoord[1] ? aCoord[1] : maxY;
})
let code = '';
for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
        code += dicCoords[`${x},${y}`] ? '#' : '.';
    }
    code += '\n';
}
console.log(code);