const input = require('./input.json');
const seeds = input.data[0].split('seeds: ')[1].split(' ').map((aSeed) => parseInt(aSeed));
const conversions = [];
let currentConversion = [];
for (let i = 3; i < input.data.length; i++) {
    if (input.data[i] === '') {
        conversions.push(currentConversion);
        currentConversion = [];
        i++;
    } else {
        currentConversion.push(input.data[i].split(' ').map((aMapPart) => parseInt(aMapPart)))
    }
}
conversions.push(currentConversion);
conversions.forEach((aConversionBlock) => {
    seeds.forEach((aValue, idx) => {
        const validConversion = aConversionBlock.find((convData) => aValue >= convData[1] && aValue < convData[1] + convData[2]);
        if (validConversion) {
            seeds[idx] = validConversion[0] + aValue - validConversion[1];
        }
    });
});
const min = seeds.reduce((prev, curr) => curr < prev ? curr : prev, Number.MAX_SAFE_INTEGER);
console.log(min);