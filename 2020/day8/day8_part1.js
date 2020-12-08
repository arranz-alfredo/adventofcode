const input = require('./input.json');
let idx = acc = 0;
const instructions = {};
while(instructions[idx] == null) {
    instructions[idx] = true;
    if (input.data[idx].substring(0, 3) === 'jmp') {
        idx += parseInt(input.data[idx].substring(4), 10);
    } else {
        input.data[idx].substring(0, 3) === 'acc' && (acc += parseInt(input.data[idx].substring(4), 10));
        idx++;
    }
}
console.log(acc);