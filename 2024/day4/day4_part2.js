const input = require('./input.json');
let coincidences = 0;
for (let y = 0; y < input.data.length - 2; y++) {
    for (let x = 0; x < input.data[0].length - 2; x++) {
        if (
            input.data[y + 1][x + 1] === 'A' &&
            (
                (input.data[y][x] === 'M' && input.data[y + 2][x + 2] === 'S') ||
                (input.data[y][x] === 'S' && input.data[y + 2][x + 2] === 'M')
            ) &&
            (
                (input.data[y + 2][x] === 'M' && input.data[y][x + 2] === 'S') ||
                (input.data[y + 2][x] === 'S' && input.data[y][x + 2] === 'M')
            )
        ) {
            coincidences++;
        }
    }
}
console.log(coincidences);