const input = require('./input.json');
const sortCards = (cards) => cards.split('').sort().join('');
const comparableCards = (cards) => cards.replace(/A/g, 'e').replace(/K/g, 'd').replace(/Q/g, 'c').replace(/J/g, '1').replace(/T/g, 'a');
const countJokers = (cards) => (cards.match(/1/g) || []).length
const getScore = (hand) => {
    const sortedCards = sortCards(hand[0]);
    if (sortedCards[0] === sortedCards[4]) { return 6; }
    if (sortedCards[0] === sortedCards[3] || sortedCards[1] === sortedCards[4]) { return countJokers(sortedCards) === 0 ? 5 : 6; }
    if ((sortedCards[0] === sortedCards[2] && sortedCards[3] === sortedCards[4]) ||
        (sortedCards[0] === sortedCards[1] && sortedCards[2] === sortedCards[4])) { return countJokers(sortedCards) === 0 ? 4 : 6; }
    if (sortedCards[0] === sortedCards[2] || sortedCards[1] === sortedCards[3] || sortedCards[2] === sortedCards[4]) {
        return countJokers(sortedCards) === 0 ? 3 : 5;
    }
    if ((sortedCards[0] === sortedCards[1] && (sortedCards[2] === sortedCards[3] || sortedCards[3] === sortedCards[4])) ||
        (sortedCards[3] === sortedCards[4] && (sortedCards[0] === sortedCards[1] || sortedCards[1] === sortedCards[2]))) {
            const countJ = countJokers(sortedCards);
            return countJ === 0 ? 2 : (countJ === 1 ? 4 : 5);
    }
    if (sortedCards[0] === sortedCards[1] || sortedCards[1] === sortedCards[2] ||
        sortedCards[2] === sortedCards[3] || sortedCards[3] === sortedCards[4]) { return countJokers(sortedCards) === 0 ? 1 : 3; }
    return countJokers(sortedCards) === 0 ? 0 : 1;
};
const hands = input.data.map((aHand) => {
    const parts = aHand.split(' ');
    return [comparableCards(parts[0]), parseInt(parts[1])];
});
hands.sort((handA, handB) => {
    const result = getScore(handA) - getScore(handB);
    if (result === 0) { return handA[0] < handB[0] ? -1 : 1; }
    return result;
});
let sum = 0;
hands.forEach((aHand, idx) => {
    sum += aHand[1] * (idx + 1);
});
console.log(sum);