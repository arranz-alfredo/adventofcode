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
        if (instructions[idx][0] === 'forward') {
            return [
                previousValue[0] + instructions[idx][1],
                previousValue[1] + (instructions[idx][1] * previousValue[2]),
                previousValue[2]
            ];
        } else {
            return [
                previousValue[0],
                previousValue[1],
                previousValue[2] + (instructions[idx][1] * (instructions[idx][0] === 'down' ? 1 : -1))
            ];
        }
    },
    [0, 0, 0]
)
console.log(result[0]*result[1]);
