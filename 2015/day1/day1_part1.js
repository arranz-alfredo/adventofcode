const input = require('./input.json');
const ups = input.data.match(/\(/g).length;
const downs = input.data.match(/\)/g).length;
console.log(ups - downs);