const input = require('./input.json');
const distances = {};
const places = {};
input.data.forEach(aRow => {
    const rowParts = aRow.split(' ');
    distances[`${rowParts[0]},${rowParts[2]}`] = parseInt(rowParts[4]);
    distances[`${rowParts[2]},${rowParts[0]}`] = parseInt(rowParts[4]);
    places[rowParts[0]] = true;
    places[rowParts[2]] = true;
});

const getPermutations = (inputArr) => {
    let result = [];
    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }
    permute(inputArr)
    return result;
};
const permutations = getPermutations(Object.keys(places));
const result = permutations.reduce((prev, curr) => {
    let cost = 0;
    for (let i = 1; i < curr.length; i++) {
        cost += distances[`${curr[i-1]},${curr[i]}`]
    }
    return cost > prev ? cost : prev;
}, -1);

console.log(result);
