const input = require('./input.json');
const data = input.data[0].split('seeds: ')[1].split(' ').map((aStr) => parseInt(aStr));
let pairs = [];
data.forEach((value, idx) => {
    if(idx % 2 === 0) { pairs.push([value, value + data[idx + 1] - 1]) }
});
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
    const newPairs = [];
    for (let i = 0; i < pairs.length; i++) {
        let [pairStart, pairEnd] = pairs[i];
        const validConversion = aConversionBlock.find(
            ([ds, ss, ln]) => (pairStart >= ss && pairStart < ss + ln) || (ss >= pairStart && ss <= pairEnd)
        );
        if (validConversion) {
            const [destStart, sourceStart, convLength] = validConversion;
            if (pairStart < sourceStart) {
                pairs.push([pairStart, sourceStart - 1]);
                pairStart = sourceStart;
            }
            if (pairEnd > sourceStart + convLength - 1) {
                pairs.push([sourceStart + convLength, pairEnd]);
                pairEnd = sourceStart + convLength - 1;
            }
            newPairs.push([
                destStart + pairStart - sourceStart,
                destStart + pairEnd - sourceStart 
            ]);
        } else {
            newPairs.push([...pairs[i]]);
        }
    }
    pairs = newPairs;
});
const min = pairs.reduce((prev, curr) => curr[0] < prev ? curr[0] : prev, Number.MAX_SAFE_INTEGER);
console.log(min);