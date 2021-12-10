const input = require('./input.json');
const properties = input.data.map(aRow => aRow.split(': ')[1].split(', ').map(aProp => parseInt(aProp.split(' ')[1])));
let bestScore = -1;
for (let i = 1; i <= 97; i++) {
    for (let j = 1; j <= 100 - i - 2; j++) {
        for (let k = 1; k <= 100 - i - j - 1; k++) {
            const l = 100 - i - j - k;
            let score = 1;
            const calories = (properties[0][4] * i) + (properties[1][4] * j) + (properties[2][4] * k) + (properties[3][4] * l);
            if (calories === 500) {
                for (let idxProp = 0; idxProp < properties[0].length - 1; idxProp++) {
                    let propScore = (properties[0][idxProp] * i) + (properties[1][idxProp] * j) + (properties[2][idxProp] * k) + (properties[3][idxProp] * l);
                    if (propScore < 0) {
                        propScore = 0;
                    }
                    score *= propScore;
                }
                bestScore = bestScore < score ? score : bestScore;
            }
        }
    }
}
console.log(bestScore);
