const input = require('./input.json');
const lights = new Array(1000).fill(0).map(() => new Array(1000).fill(0));
let total = 0;
input.data.forEach(aRow => {
    const parts = aRow.split(' ');
    const x1 = parseInt(parts[parts.length - 3].split(',')[0], 10);
    const y1 = parseInt(parts[parts.length - 3].split(',')[1], 10);
    const x2 = parseInt(parts[parts.length - 1].split(',')[0], 10);
    const y2 = parseInt(parts[parts.length - 1].split(',')[1], 10);
    for (x = x1; x <= x2; x++) {
        for (y = y1; y <= y2; y++) {
            if (aRow[6] === 'n') {
                total++;
                lights[x][y]++;
            } else if (aRow[6] === 'f') {
                if (lights[x][y] > 0) {
                    total--;
                    lights[x][y]--;
                }
            } else {
                total+=2;
                lights[x][y]+=2;
            }
        }
    }
});
console.log(total);
