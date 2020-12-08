const input = require('./input.json');
const dic = new Map(input.data.map(auxNum => [auxNum, true]));
main:
for (let i = 0; i < input.data.length - 1; i++) {
    for (let j = i + 1; j < input.data.length; j++) {
        if (dic.has(2020 - input.data[i] - input.data[j])) {
            console.log((2020 - input.data[i] - input.data[j]) * input.data[i] * input.data[j]);
            break main;       
        }
    }
}