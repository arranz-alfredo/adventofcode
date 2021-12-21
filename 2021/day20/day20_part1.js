const input = require('./input.json');
const algorithm = input.data[0].split('').map(aValue => aValue === '#' ? 1 : 0);
let image = [
    Array(input.data[2].length + 6).fill(0),
    Array(input.data[2].length + 6).fill(0),
    Array(input.data[2].length + 6).fill(0),
    ...input.data.slice(2).map(aRow => [
        0, 0, 0,
        ...(aRow.split('').map(aValue => aValue === '#' ? 1 : 0)),
        0, 0, 0
    ]),
    Array(input.data[2].length + 6).fill(0),
    Array(input.data[2].length + 6).fill(0),
    Array(input.data[2].length + 6).fill(0)
];

for (let step = 0; step < 2; step++) {
    const newImage = Array(image.length).fill(null);
    for (let i = 0; i < newImage.length; i++) {
        newImage[i] = Array(image[0].length).fill(null);
    }
    for (let y = 0; y < image.length; y++) {
        for (let x = 0; x < image[y].length; x++) {
            let code = '';
            for (let j = y - 1; j <= y + 1; j++) {
                for (let i = x - 1; i <= x + 1; i++) {
                    code += (j < 0 || j === image.length || i < 0 || i === image[j].length) ? (step % 2 === 0 ? '0' : '1') : image[j][i].toString();
                }
            }
            newImage[y][x] = algorithm[parseInt(code, 2)];
        }
    }
    image = newImage;
}
image = image.slice(1, image.length - 1).map(aRow => aRow.slice(1, aRow.length - 1));
console.log(image.reduce((prev, curr) => prev + curr.reduce((prev2, curr2) => prev2 + curr2), 0));