const input = require('./input.json');
let sum = 0;
const nums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
input.data.forEach((aRow) => {
    let convRow = '';
    for (let i = 0; i < aRow.length; i++) {
        if (aRow[i] >= '0' && aRow[i] <= '9') {
            convRow += aRow[i];
        } else {
            for (let j = 0; j < nums.length; j++) {
                if (aRow.length >= i + nums[j].length && aRow.substring(i, i + nums[j].length) === nums[j]) {
                    convRow += (j + 1).toString();
                }
            }
        }
    }
    sum += parseInt(convRow[0] + convRow[convRow.length - 1]);
});
console.log(sum);