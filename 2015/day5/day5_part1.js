const input = require('./input.json');
const valids = input.data.filter(aString => {
    return aString.length >= aString.replace(/[aeiou]/g, '').length + 3 && 
        aString.match(/(.)\1+/g) != null && 
        aString.match(/ab|cd|pq|xy/) == null
});
console.log(valids.length);