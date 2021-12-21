const input = require('./input.json');
const positions = input.data.map(aRow => parseInt(aRow.split(' ')[4]) - 1);
const scores = Array(positions.length).fill(0);
let diceValue = 0;
let diceRolls = 0;
let currentPlayer = 0;

while (scores.findIndex(aValue => aValue >= 1000) === -1) {
    positions[currentPlayer] = ((positions[currentPlayer] + (diceValue * 3 + 6)) % 10);
    scores[currentPlayer] += positions[currentPlayer] + 1;
    diceValue += 3;
    diceRolls += 3;
    currentPlayer = (currentPlayer + 1) % 2;
}
console.log(diceRolls * (scores[0] >= 1000 ? scores[1] : scores[0]));
