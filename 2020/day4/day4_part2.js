const input = require('./input.json');
const reqFields = {
    byr: /^19[2-9][0-9]$|^200[0-2]$/,
    iyr: /^201[0-9]$|^2020$/,
    eyr: /^202[0-9]$|^2030$/,
    hgt: /^1[5-8][0-9]cm$|^19[0-3]cm$|^59in$|^6[0-9]in$|^7[0-6]in$/,
    hcl: /^#[0-9a-f]{6}$/,
    ecl: /^amb$|^blu$|^brn$|^gry$|^grn$|^hzl$|^oth$/,
    pid: /^\d{9}$/
};
let validsCount = 0;
let auxReqFields = { ...reqFields };
input.data.forEach((aRow, rowIdx) => {
    if (aRow === '') {
        Object.keys(auxReqFields).length === 0 && validsCount++;
        auxReqFields = { ...reqFields }
    } else {
        aRow.split(' ').forEach(anElem => {
            if (new RegExp(auxReqFields[anElem.split(':')[0]]).test(anElem.split(':')[1])) {
                delete auxReqFields[anElem.split(':')[0]];
            }
        })
    }
    rowIdx === input.data.length - 1 && Object.keys(auxReqFields).length === 0 && validsCount++;
});
console.log(validsCount);