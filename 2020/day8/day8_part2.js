const input = require('./input.json');
let idx = acc = candidateCount = candidatesProcessed = 0;
let instructions = {};
let auxInst = [ ...input.data ];
while (idx < auxInst.length) {
    if (instructions[idx] != null) {
        idx = acc = candidateCount = 0;
        instructions = {};
        auxInst = [ ...input.data ];
        candidatesProcessed++;
    } else {
        instructions[idx] = true;
        if (auxInst[idx].substring(0, 3) === 'jmp' || auxInst[idx].substring(0, 3) === 'nop') {
            if (candidatesProcessed === candidateCount) {
                auxInst[idx] = (auxInst[idx].substring(0, 3) === 'jmp' ? 'nop' : 'jmp') + auxInst[idx].substring(3);
            }
            candidateCount++;
        }
        if (auxInst[idx].substring(0, 3) === 'jmp') {
            idx += parseInt(auxInst[idx].substring(4), 10);
        } else {
            auxInst[idx].substring(0, 3) === 'acc' && (acc += parseInt(auxInst[idx].substring(4), 10));
            idx++;
        }
    }
}
console.log(acc);