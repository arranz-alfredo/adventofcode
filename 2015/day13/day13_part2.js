const input = require('./input.json');
const happiness = {};
const people = {};
input.data.forEach(aRow => {
    const rowParts = aRow.split(' ');
    happiness[`${rowParts[0]},${rowParts[10]}`] = parseInt(rowParts[3])*(rowParts[2] === 'gain' ? 1 : -1);
    people[rowParts[0]] = true;
});
Object.keys(people).forEach(aPerson => {
    happiness[`${aPerson},Me`] = 0;
    happiness[`Me,${aPerson}`] = 0;
});
people['Me'] = true;

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
const permutations = getPermutations(Object.keys(people));
const result = permutations.reduce((prev, curr) => {
    let cost = happiness[`${curr[curr.length - 1]},${curr[0]}`] + happiness[`${curr[0]},${curr[curr.length - 1]}`];
    for (let i = 1; i < curr.length; i++) {
        cost += happiness[`${curr[i-1]},${curr[i]}`] + happiness[`${curr[i]},${curr[i-1]}`];
    }
    return cost > prev ? cost : prev;
}, -1);

console.log(result);
