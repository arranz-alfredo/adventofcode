const input = require('./input.json');
const rules = {};

input.data.forEach(aRow => {
    const rowParts = aRow.split(' -> ');
    if (rowParts[1] === 'b') {
        rules['b'] = '3176';
    } else {
        rules[rowParts[1]] = rowParts[0];
    }
});

const calculateValue = (id) => {
    let test = parseInt(id);
    if (!isNaN(test)) {
        return test;
    }
    let result;
    const ruleParts = rules[id].split(' ');
    if (ruleParts.length === 1) {
        result = calculateValue(ruleParts[0]);
    } else if (ruleParts.length === 2) {
        result = 65536 + ~calculateValue(ruleParts[1]);
    } else {
        if (ruleParts[1] === 'AND') {
            result = calculateValue(ruleParts[0]) & calculateValue(ruleParts[2]);
        } else if (ruleParts[1] === 'OR') {
            result = calculateValue(ruleParts[0]) | calculateValue(ruleParts[2]);
        } else if (ruleParts[1] === 'LSHIFT') {
            result = calculateValue(ruleParts[0]) << parseInt(ruleParts[2]);
        } else {
            result = calculateValue(ruleParts[0]) >>> parseInt(ruleParts[2]);
        }
    }
    rules[id] = result.toString();
    return result;
};
console.log(calculateValue('a'));
