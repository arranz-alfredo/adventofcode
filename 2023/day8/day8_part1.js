const input = require('./input.json');
const instructions = input.data[0].split('').map((dir) => dir === 'L' ? 0 : 1);
const network = {};
for (let i = 2; i < input.data.length; i++) {
    const parts = input.data[i].split(' = ');
    network[parts[0]] = parts[1].substring(1, parts[1].length - 1).split(', ');
}
let step = 0;
let currentNode = 'AAA';
while(currentNode !== 'ZZZ') {
    currentNode = network[currentNode][instructions[step % instructions.length]];
    step++;
}
console.log(step);