const input = require('./input.json');
const auntsProps = input.data.map((aRow, idx) => {
    const props = {};
    const substrIdx = idx >= 99 ? 9 : (idx >= 9 ? 8 : 7);
    aRow.substring(substrIdx).split(', ').forEach(aProp => {
        const propParts = aProp.split(': ');
        props[propParts[0]] = parseInt(propParts[1]);
    });
    return props;
});
const machineData = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
}
console.log(auntsProps.findIndex(aProps => Object.keys(aProps).reduce(
    (prev, curr) => (
        prev &&
        ((curr !== 'cats' && curr !== 'trees') || aProps[curr] > machineData[curr]) &&
        ((curr !== 'pomeranians' && curr !== 'goldfish') || aProps[curr] < machineData[curr]) &&
        (curr === 'cats' || curr === 'trees' || curr === 'pomeranians' || curr === 'goldfish' || aProps[curr] === machineData[curr])
    ), true)) + 1
);
