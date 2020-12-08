const input = require('./input.json');
let total = 0;
input.data.forEach(aSize => {
    const sizeParts = aSize.split('x').map(aNum => parseInt(aNum, 10)).sort((x, y) => x - y);
    total += 2 * (sizeParts[0] + sizeParts[1]) + (sizeParts[0] * sizeParts[1] * sizeParts[2]);
})
console.log(total);