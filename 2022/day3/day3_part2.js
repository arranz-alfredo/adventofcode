const input = require('./input.json');
let result = 0;
for(let i = 0; i < input.data.length; i += 3) {
    const sharedItem = input.data[i].split('').find((aChar) =>
        input.data[i + 1].indexOf(aChar) >= 0 && 
        input.data[i + 2].indexOf(aChar) >= 0);
    const code = sharedItem.charCodeAt(0);
    result += code >= 97 ? code - 97 + 1 : code - 65 + 27;
    
}
console.log(result);