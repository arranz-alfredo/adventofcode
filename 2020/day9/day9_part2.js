const input = require('./input.json');
const target = 2089807806;
for (let i = 0; i < input.data.length - 1 && input.data[i] !== target; i++) {
    let sum = input.data[i]
    for (let j = i + 1; j < input.data.length && input.data[j] !== target; j++) {
        sum += input.data[j];
        if (sum === target) {
            const values = input.data.slice(i, j + 1).sort((a, b) => a - b);
            console.log(values[0] + values[values.length - 1]);
        } else if(sum > target) {
            break;
        }
    }    
}