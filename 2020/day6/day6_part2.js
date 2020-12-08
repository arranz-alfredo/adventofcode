const input = require('./input.json');
let dic = {};
total = 0;
people = 0;
input.data.forEach(aRow => {
    if (aRow === '') {
        total += Object.keys(dic).filter(aKey => dic[aKey] === people).length;
        dic = {};
        people = 0;
    } else {
        aRow.split('').forEach(aChar => {
            dic[aChar] = dic[aChar] != null ? dic[aChar] + 1 : 1;
        })
        people++
    }
});
total += Object.keys(dic).filter(aKey => dic[aKey] === people).length;
console.log(total);