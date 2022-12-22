const input = require('./input.json');
let regX = 1;
let cycle = 1;
const checkCycles = [20, 60, 100, 140, 180, 220];
let signalStrengthSum = 0;
input.data.forEach((instruction, idx) => {
    const insParts = instruction.split(' ');
    if (insParts[0] === 'noop') {
        if (checkCycles.findIndex((aCycle) => aCycle === cycle) !== -1) {
            signalStrengthSum = signalStrengthSum + (cycle * regX);
        }
        cycle++;
    } else {
        if (checkCycles.findIndex((aCycle) => aCycle === cycle) !== -1) {
            signalStrengthSum += (cycle * regX);
        } else if (checkCycles.findIndex((aCycle) => aCycle === (cycle + 1)) !== -1) {
            signalStrengthSum += ((cycle + 1) * regX);
        }
        regX += parseInt(insParts[1]);
        cycle += 2;
    }
});
console.log(signalStrengthSum);