const input = require('./input.json');
const packets = [];
input.data.forEach((aLine) => {
    if (aLine !== '') {
        packets.push(JSON.parse(aLine));
    }
});
packets.push([[2]]);
packets.push([[6]]);
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
packets.sort(compare);
const pos1 = packets.findIndex((aPacket) => JSON.stringify(aPacket) === '[[2]]') + 1;
const pos2 = packets.findIndex((aPacket) => JSON.stringify(aPacket) === '[[6]]') + 1;
console.log(pos1 * pos2);