const input = require('./input.json');
const times = input.data[0].replace(/  +/g, ' ').split(' ').slice(1).map((aTime) => parseInt(aTime));
const distances = input.data[1].replace(/  +/g, ' ').split(' ').slice(1).map((aDistance) => parseInt(aDistance));
let ways = 1;
times.forEach((aTime, idx) => {
    let i;
    for (i = 0; i <= aTime / 2; i++) {
        if (i * (aTime - i) > distances[idx]) {
            ways *= (aTime + 1) - (i * 2);
            break;
        }
    }
});
console.log(ways);