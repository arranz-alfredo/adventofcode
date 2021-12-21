const input = require('./input.json');
const algorithm = input.data[0].split('').map(aValue => aValue === '#' ? 1 : 0);
const steps = 50;
const oriImageSize = input.data.slice(2).length;
let image = Array(((steps + 1) * 2) + oriImageSize).fill(null);
for (let i = 0; i < image.length; i++) {
    image[i] = Array((steps + 1) * 2 + oriImageSize).fill(0);
    if (i > steps && i <= steps + oriImageSize) {
        image[i].splice(steps + 1, oriImageSize, ...input.data.slice(2)[i - steps - 1].split('').map(aValue => aValue === '#' ? 1 : 0))
    }
}

for (let step = 0; step < 50; step++) {
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