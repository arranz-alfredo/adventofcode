const input = require('./input.json');
//ROCK 1, PAPER 2, SCISSORS 3'
//LOST 0, DRAW 3, WIN 6
const points = {
    'A X': 3,
    'A Y': 4,
    'A Z': 8,
    'B X': 1,
    'B Y': 5,
    'B Z': 9,
    'C X': 2,
    'C Y': 6,
    'C Z': 7,
};
const result = input.data.reduce((prev, curr) => prev + points[curr], 0);
console.log(result);