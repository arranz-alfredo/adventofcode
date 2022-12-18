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
    const startPos = stacks[parseInt(stepParts[3]) - 1].length - parseInt(stepParts[1]);
    const elems = stacks[parseInt(stepParts[3]) - 1].splice(startPos, parseInt(stepParts[1]))
    stacks[parseInt(stepParts[5]) - 1] = [
        ...stacks[parseInt(stepParts[5]) - 1],
        ...elems
    ]
});
console.log(stacks.map((aStack) => aStack[aStack.length - 1]).join(''));
