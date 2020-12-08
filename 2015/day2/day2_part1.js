const input = require('./input.json');
let total = 0;
input.data.forEach(aSize => {
    const sizeParts = aSize.split('x');
    const a = sizeParts[0]*sizeParts[1];
    const b = sizeParts[0]*sizeParts[2];
    const c = sizeParts[1]*sizeParts[2];
    const min = (a <= b) && (a <= c) ? a : b <= c ? b : c;
    total += 2 * (a + b + c) + min;
})
console.log(total);