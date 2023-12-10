const input = require('./input.json');
const time = parseInt(input.data[0].replace(/  +/g, ' ').split(' ').slice(1).join(''));
const distance = parseInt(input.data[1].replace(/  +/g, ' ').split(' ').slice(1).join(''));
let ways = 0;
for (i = 0; i <= time / 2; i++) {
    if (i * (time - i) > distance) {
        ways = (time + 1) - (i * 2);
        break;
    }
}
console.log(ways);