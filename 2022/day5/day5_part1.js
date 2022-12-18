const input = require('./input.json');
const stacks = [];
for (let stack = 0; stack <= 8; stack++) {
    stacks.push([]);
    for (let level = 0; level <= 7; level++) {
        crate = input.data[level][stack * 4 + 1];
        if (crate !== ' ') {
            stacks[stack].unshift(crate);
        }
    }    
}
input.data.slice(10).forEach((aStep) => {
    const stepParts = aStep.split(' ');
    for (let moves = 0; moves < parseInt(stepParts[1]); moves++) {
        stacks[parseInt(stepParts[5]) - 1].push(stacks[parseInt(stepParts[3]) - 1].pop())
    }
});
console.log(stacks.map((aStack) => aStack[aStack.length - 1]).join(''));
