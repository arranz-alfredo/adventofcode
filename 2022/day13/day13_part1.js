const input = require('./input.json');
const pairs = [];
input.data.forEach((aLine, idx) => {
    if ((idx + 1) % 3 === 0) {
        pairs.push([JSON.parse(input.data[idx - 2]), JSON.parse(input.data[idx - 1])]);
    }
});
const compare = (a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
    } else if (typeof a === 'number') {
        return compare([a], b);
    } else if (typeof b === 'number') {
        return compare(a, [b]);
    } else {
        for (let i = 0; i < a.length; i++) {
            if (i >= b.length) {
                return 1;
            }
            const comp = compare(a[i], b[i]);
            if (comp !== 0) {
                return comp;
            }
        }
        return a.length < b.length ? -1 : 0;
    }
}
console.log(pairs.reduce((sum, aPair, idx) => sum + (compare(aPair[0], aPair[1]) < 0 ? idx + 1 : 0), 0));