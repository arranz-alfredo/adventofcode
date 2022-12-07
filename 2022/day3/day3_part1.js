const input = require('./input.json');
const result = input.data.reduce((prev, curr) => {
    const rucksack1 = curr.slice(0, curr.length / 2);
    const rucksack2 = curr.slice(curr.length / 2);
    const sharedItem = rucksack1.split('').find((aChar) => rucksack2.indexOf(aChar) >= 0);
    const code = sharedItem.charCodeAt(0);
    return code >= 97 ? prev + code - 97 + 1 : prev + code - 65 + 27;
}, 0);
console.log(result);