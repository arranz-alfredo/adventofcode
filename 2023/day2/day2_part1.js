const input = require('./input.json');
const maxs = { red: 12, green: 13, blue: 14};
let sum = 0;
input.data.forEach((aGame, idxGame) => {
    const gameSubsets = aGame.split(': ')[1].split('; ');
    let possible = true;
    gameSubsets.forEach((aSubset)  => {
        const subsetParts = aSubset.split(', ');
        const possibleSubset = subsetParts.reduce((prev, curr, idx) => {
            const cubeData = subsetParts[idx].split(' ');
            return prev && parseInt(cubeData[0]) <= maxs[cubeData[1]];
        }, true);
        possible = possible && possibleSubset;
    });
    if(possible) {
        sum += idxGame + 1
    };
});
console.log(sum);