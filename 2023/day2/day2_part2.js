const input = require('./input.json');
let sum = 0;
input.data.forEach((aGame) => {
    const gameMins = { red: 0, green: 0, blue: 0};
    const gameSubsets = aGame.split(': ')[1].split('; ');
    gameSubsets.forEach((aSubset) => {
        const subsetParts = aSubset.split(', ');
        subsetParts.forEach((aSubsetPart) => {
            const cubeData = aSubsetPart.split(' ');
            if (!gameMins[cubeData[1]] || gameMins[cubeData[1]] < parseInt(cubeData[0])) {
                gameMins[cubeData[1]] = parseInt(cubeData[0])
            }
        });
    });
    sum += gameMins['red'] * gameMins['green'] * gameMins['blue'];
});
console.log(sum);