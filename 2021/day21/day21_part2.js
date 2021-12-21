const input = require('./input.json');

const sumValues = [
    3, 4, 5, 4, 5, 6, 5, 6, 7,
    4, 5, 6, 5, 6, 7, 6, 7, 8,
    5, 6, 7, 6, 7, 8, 7, 8, 9
];

let data = [
    {
        pos: [
            parseInt(input.data[0].split(' ')[4]) - 1,
            parseInt(input.data[1].split(' ')[4]) - 1
        ],
        score: [0, 0],
        count: 1
    }
];
const results = [0, 0];
while (data.length > 0) {
    const newDataTurn1 = [];
    data.forEach(({ pos, score, count }) => {
        sumValues.forEach(i => {
            const newPosition = (pos[0] + i) % 10;
            const newScore = score[0] + newPosition + 1;
            if (newScore >= 21) {
                results[0] += count;
            } else {
                const idx = newDataTurn1.findIndex(anElem =>
                    anElem.pos[0] === newPosition && anElem.score[0] === newScore
                    && anElem.pos[1] === pos[1] && anElem.score[1] === score[1]
                );
                if (idx >= 0) {
                    newDataTurn1[idx].count += count;
                } else {
                    newDataTurn1.push({ pos: [newPosition, pos[1]], score: [newScore, score[1]], count });
                }
            }
        });
    });
    const newDataTurn2 = [];
    newDataTurn1.forEach(({ pos, score, count }) => {
        sumValues.forEach(i => {
            const newPosition = (pos[1] + i) % 10;
            const newScore = score[1] + newPosition + 1;
            if (newScore >= 21) {
                results[1] += count;
            } else {
                const idx = newDataTurn2.findIndex(anElem =>
                    anElem.pos[1] === newPosition && anElem.score[1] === newScore
                    && anElem.pos[0] === pos[0] && anElem.score[0] === score[0]
                );
                if (idx >= 0) {
                    newDataTurn2[idx].count += count;
                } else {
                    newDataTurn2.push({ pos: [pos[0], newPosition], score: [score[0], newScore], count });
                }
            }
        });
    });
    data = newDataTurn2;
}
console.log(results[0] >= results[1] ? results[0] : results[1]);
