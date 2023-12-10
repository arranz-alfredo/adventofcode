const input = require('./input.json');
const mcd = (numA, numB) => numB === 0 ? numA : mcd(numB, numA % numB);
const mcm = (numA, numB) => (numA * numB) / mcd(numA, numB);
const instructions = input.data[0].split('').map((dir) => dir === 'L' ? 0 : 1);
const network = {};
for (let i = 2; i < input.data.length; i++) {
    const parts = input.data[i].split(' = ');
    network[parts[0]] = parts[1].substring(1, parts[1].length - 1).split(', ');
}
let initialNodes = Object.keys(network).filter((aNodeName) => aNodeName[2] === 'A');
const results = [];
initialNodes.forEach((anInitialNode) => {
    let step = 0;
    let currentNode = anInitialNode;
    while(currentNode[2] !== 'Z') {
        currentNode = network[currentNode][instructions[step % instructions.length]];
        step++;
    }
    results.push(step);
});
const minSteps = results.reduce((prev, curr) => mcm(prev, curr), 1);
console.log(minSteps);
