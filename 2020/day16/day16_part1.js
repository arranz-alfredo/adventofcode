const input = require('./input.json');
const ranges = [null, null];
for (let i = 0; i < 20; i++) {
    const rowRanges = input.data[i]
        .split(':')[1]
        .split(' ')
        .filter((elem, idx) => idx % 2 === 1)
        .map(elem => elem.split('-'));
    if (ranges[0] == null) {
        ranges[0] = rowRanges[0]
    } else {
        ranges[0][0] > rowRanges[0][0] && (ranges[0][0] = rowRanges[0][0]);
        ranges[0][1] < rowRanges[0][1] && (ranges[0][1] = rowRanges[0][1]);
    }
    if (ranges[1] == null) {
        ranges[1] = rowRanges[1]
    } else {
        ranges[1][0] > rowRanges[1][0] && (ranges[1][0] = rowRanges[1][0]);
        ranges[1][1] < rowRanges[1][1] && (ranges[1][1] = rowRanges[1][1]);
    }
}
let invalidSum = 0;
for (let i = 25; i < input.data.length; i++) {
    const numbers = input.data[i].split(',');
    numbers.forEach(aNumberTxt => {
        const aNumber = parseInt(aNumberTxt, 10);
        if (aNumber < ranges[0][0] ||
            (aNumber > ranges[0][1] && aNumber < ranges[1][0] ) ||
            aNumber > ranges[1][1]) {
            invalidSum += aNumber
        }
    })
}
console.log(invalidSum);
