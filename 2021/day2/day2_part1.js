const input = require('./input.json');
const instructions = input.data.map(anInput => {
    const instParts = anInput.split(' ');
    return [
        instParts[0],
        parseInt(instParts[1], 10)
    ];
});
const result = instructions.reduce(
    (previousValue, currentValue, idx) => {
        const hPos = (instructions[idx][0] === 'forward' ? previousValue[0] + instructions[idx][1] : previousValue[0]);
        const vPos = (instructions[idx][0] !== 'forward' ? previousValue[1] + (instructions[idx][1] * (instructions[idx][0] === 'down' ? 1 : -1)) : previousValue[1]);
        return [hPos, vPos];
    },
    [0, 0]
)
console.log(result[0]*result[1]);
