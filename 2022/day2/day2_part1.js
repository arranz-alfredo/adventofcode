const input = require('./input.json');
//ROCK 1, PAPER 2, SCISSORS 3'
//LOST 0, DRAW 3, WIN 6
const points = {
    'A X': 4,
    'A Y': 8,
    'A Z': 3,
    'B X': 1,
    'B Y': 5,
    'B Z': 9,
    'C X': 7,
    'C Y': 2,
    'C Z': 6,
};
const result = input.data.reduce((prev, curr) => prev + points[curr], 0);
console.log(result);