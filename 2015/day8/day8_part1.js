const input = require('./input.json');
let codeChars = 0;
let encodedChars = 0;
input.data.forEach(aRow => {
    codeChars += aRow.length + 2;
    let auxString = aRow.replace(/\/\//g, '....').replace(/\/\'/g, '....').replace(/\//g, '\\').replace(/\\x[0-9a-fA-F]{2}/g, '.....');
    encodedChars += auxString.length + 6;
})
console.log(encodedChars - codeChars);
