const input = require('./input.json');
const dic = {};
input.data.some(aNumber => {
    if (dic[2020 - aNumber]) {
        console.log(aNumber * (2020 - aNumber));
        return true;
    }
    dic[aNumber] = true;
});