const input = require('./input.json');
const valids = input.data.filter(aRow => {
    const parts = aRow.split(' ');
    const [firstIdx, secondIdx] = parts[0].split('-');
    const firstLetter = parts[2][firstIdx - 1];
    const secondLetter = parts[2][secondIdx - 1];
    return (firstLetter === parts[1][0] || secondLetter === parts[1][0]) && firstLetter !== secondLetter;
});
console.log(valids.length);