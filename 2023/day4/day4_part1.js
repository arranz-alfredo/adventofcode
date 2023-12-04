const input = require('./input.json');
let sum = 0;
input.data.forEach((aCard) => {
    const [winningNums, ownNums] = aCard.substring(10).split(' | ').map((aPart) => {
        return aPart.split(' ').map((aStrNum) => parseInt(aStrNum));
    });
    let cardPoints = 0;
    ownNums.forEach((anOwnNum) => {
        if(winningNums.findIndex((aNum) => aNum === anOwnNum) >= 0) {
            cardPoints = cardPoints === 0 ? 1 : cardPoints * 2;
        }
    })
    sum += cardPoints;
});
console.log(sum);