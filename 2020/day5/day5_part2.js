const input = require('./input.json');
ids = {};
input.data.forEach(aCode => {
    ids[parseInt(aCode.substring(0, 7).replace(/B/g,'1').replace(/F/g,'0'), 2) * 8 + parseInt(aCode.substring(7).replace(/R/g,'1').replace(/L/g,'0'), 2)] = true;
});
for(let i = 0; i < 1024; i++) {
    ids[i] == null && ids[i - 1] && ids[i + 1] && console.log(i);
}