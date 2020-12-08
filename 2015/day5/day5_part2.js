const input = require('./input.json');
const valids = input.data.filter(aString => {
    return aString.match(/(..)\w*\1/g) != null && 
        aString.match(/(.)(.)\1/g) != null
});
console.log(valids.length);