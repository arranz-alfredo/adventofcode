const input = require('./input.json');
const startPoints = [];
for (let y = 0; y < input.data.length; y++) {
    for (let x = 0; x < input.data[0].length; x++) {
        if (input.data[y][x] === 'a' || input.data[y][x] === 'S') {
            startPoints.push([x, y]);
        }
    }
}
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
startPoints.forEach((aStartPoint) => {
    moveTo(aStartPoint[0], aStartPoint[1], "a".charCodeAt(0), -1, '');
});
console.log(minSteps);