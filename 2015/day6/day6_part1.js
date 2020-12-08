const input = require('./input.json');
const lights = new Array(1000).fill(0).map(() => new Array(1000).fill(false));
let count = 0;
input.data.forEach(aRow => {
    const parts = aRow.split(' ');
    const x1 = parseInt(parts[parts.length - 3].split(',')[0], 10);
    const y1 = parseInt(parts[parts.length - 3].split(',')[1], 10);
    const x2 = parseInt(parts[parts.length - 1].split(',')[0], 10);
    const y2 = parseInt(parts[parts.length - 1].split(',')[1], 10);
    for (x = x1; x <= x2; x++) {
        for (y = y1; y <= y2; y++) {
            if (aRow[6] === 'n') {
                !lights[x][y] && count++;
                lights[x][y] = true;
            } else if (aRow[6] === 'f') {
                lights[x][y] && count--;
                lights[x][y] = false;
            } else {
                lights[x][y] ? count-- : count++;
                lights[x][y] = !lights[x][y];
            }
        }
    }
});
console.log(count);
