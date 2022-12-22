const input = require('./input.json');
let spriteCenterPos = 1;
const CTR = ['', '', '', '', '', '']
let writePos = 0;
input.data.forEach((instruction, idx) => {
    const insParts = instruction.split(' ');
    if (insParts[0] === 'noop') {
        CTR[Math.floor(writePos / 40)] += Math.abs(spriteCenterPos - (writePos % 40)) <= 1 ? '#' : '.';
        writePos++;
    } else {
        CTR[Math.floor(writePos / 40)] += Math.abs(spriteCenterPos - (writePos % 40)) <= 1 ? '#' : '.';
        CTR[Math.floor((writePos + 1) / 40)] += Math.abs(spriteCenterPos - ((writePos + 1) % 40)) <= 1 ? '#' : '.';
        spriteCenterPos += parseInt(insParts[1]);
        writePos += 2;
    }
});
console.log(CTR);