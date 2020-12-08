const input = require('./input.json');
let maxValue = 0;
input.data.forEach(aCode => {
    id = parseInt(aCode.substring(0, 7).replace(/B/g,'1').replace(/F/g,'0'), 2) * 8 + parseInt(aCode.substring(7).replace(/R/g,'1').replace(/L/g,'0'), 2);
    maxValue < id && (maxValue = id);
});
console.log(maxValue);