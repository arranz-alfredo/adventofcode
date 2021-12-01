const input = require('./input.json');
let result = 0;
input.data.forEach((value, i) => {
    if (i < input.data.length - 3) {
        if (input.data[i] + input.data[i + 1] + input.data[i + 2] < input.data[i + 1] + input.data[i + 2] + input.data[i + 3]) {
            result+=1;
        }
    }
});
console.log(result);