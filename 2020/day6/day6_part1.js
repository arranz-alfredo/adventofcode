const input = require('./input.json');
let total = 0;
let groupResponses = '';
input.data.forEach(aRow => {
    if (aRow === '') {
        total += groupResponses.replace(/(.)(?=.*\1)/g, "").length;
        groupResponses = '';
    } else {
        groupResponses += aRow;
    }
});
total += groupResponses.replace(/(.)(?=.*\1)/g, "").length;
console.log(total);