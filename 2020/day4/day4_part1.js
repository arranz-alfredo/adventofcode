const input = require('./input.json');
const reqFields = { byr: true, iyr: true, eyr: true, hgt: true, hcl: true, ecl: true, pid: true };
let validsCount = 0;
let auxReqFields = { ...reqFields };
input.data.forEach((aRow, rowIdx) => {
    if (aRow === '') {
        Object.keys(auxReqFields).length === 0 && validsCount++;
        auxReqFields = { ...reqFields }
    } else {
        aRow.split(' ').forEach(anElem => {
            delete auxReqFields[anElem.split(':')[0]];
        })
    }
    rowIdx === input.data.length - 1 && Object.keys(auxReqFields).length === 0 && validsCount++;
});
console.log(validsCount);