const input = require('./input.json');
const valids = input.data.filter(aRow => {
    const parts = aRow.split(' ');
    const [min, max] = parts[0].split('-');
    const ocurrences = (parts[2].match(new RegExp(parts[1][0], "g")) || []).length
    return ocurrences >= min && ocurrences <= max;
});
console.log(valids.length);