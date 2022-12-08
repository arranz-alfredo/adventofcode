const input = require('./input.json');
const overlaps = input.data.filter((aPair) => {
    const elfs = aPair.split(',');
    const elf1 = elfs[0].split('-').map((aStrNumber) => parseInt(aStrNumber));
    const elf2 = elfs[1].split('-').map((aStrNumber) => parseInt(aStrNumber));
    return (elf1[0] >= elf2[0] && elf1[0] <= elf2[1]) ||
        (elf1[1] >= elf2[0] && elf1[1] <= elf2[1]) ||
        (elf2[0] >= elf1[0] && elf2[0] <= elf1[1]) ||
        (elf2[1] >= elf1[0] && elf2[1] <= elf1[1]);
});
console.log(overlaps.length);