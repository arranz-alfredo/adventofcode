const input = require('./input.json');
let sum = 0;
const cardsCounter = {};
input.data.forEach((aCard, cardIdx) => { cardsCounter[cardIdx] = 1; });
input.data.forEach((aCard, cardIdx) => {
    const [winningNums, ownNums] = aCard.substring(10).split(' | ').map((aPart) => {
        return aPart.split(' ').map((aStrNum) => parseInt(aStrNum));
    });
    let matchingNums = ownNums.filter((anOwnNum) => winningNums.findIndex((aNum) => aNum === anOwnNum) >= 0);
    for (let i = 1; i <= matchingNums.length; i++) {
        cardsCounter[cardIdx + i] += cardsCounter[cardIdx];
    }
    sum += cardsCounter[cardIdx];
});
console.log(sum);