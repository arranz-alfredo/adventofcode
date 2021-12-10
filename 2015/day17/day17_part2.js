const input = require('./input.json');
const maxComb = parseInt(Array(input.data.length).fill('1').join(''), 2);
let validCombs = 0;
let minContainers = input.data.length;
for(let i = 1; i < maxComb; i++) {
    const mults = i.toString(2).padStart(input.data.length, '0').split('').map(aValue => parseInt(aValue));
    const containerCount = mults.filter(aMult => aMult === 1).length;
    if (containerCount <= minContainers) {
        const liters = mults.reduce((prev, curr, idx) => prev + curr*input.data[idx], 0);
        if (liters === 150) {
            if (containerCount < minContainers) {
                minContainers = containerCount;
                validCombs = 1;
            } else {
                validCombs += 1;
            }            
        }
    }
}
console.log(validCombs);