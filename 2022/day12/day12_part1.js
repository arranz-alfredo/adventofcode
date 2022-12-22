const input = require('./input.json');
const startY = input.data.findIndex((aRow) => aRow.indexOf('S') !== -1);
const startX = input.data[startY].indexOf('S');
const visitedPositions = {};
let minSteps = Infinity;
const moveTo = (x, y, currentHeight, currentStep) => {
    if (x >= 0 && x < input.data[0].length && y >= 0 && y < input.data.length) {
        const newStep = currentStep + 1;
        if ((visitedPositions[x + '_' + y] == null || visitedPositions[x + '_' + y] > newStep)) {
            if (input.data[y][x] === 'E') {
                if (currentHeight === "z".charCodeAt(0) || currentHeight === "y".charCodeAt(0)) {
                    minSteps = minSteps > newStep ? newStep : minSteps;
                }
            } else {
                const newHeight = input.data[y][x] === 'S' ? "a".charCodeAt(0) : input.data[y].charCodeAt(x);
                if (newHeight - currentHeight <= 1) {
                    visitedPositions[x + '_' + y] = newStep;
                    moveTo(x + 1, y, newHeight, newStep);
                    moveTo(x, y - 1, newHeight, newStep);
                    moveTo(x, y + 1, newHeight, newStep);
                    moveTo(x - 1, y, newHeight, newStep);
                }
            }
        }
    }
}
moveTo(startX, startY, "a".charCodeAt(0), -1, '');
console.log(minSteps);