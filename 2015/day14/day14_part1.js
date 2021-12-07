const input = require('./input.json');
const reindeers = input.data.map(aRow => {
    const rowParts = aRow.split(' ');
    return {
        name: rowParts[0],
        flySpeed: parseInt(rowParts[3]),
        flyTime: parseInt(rowParts[6]),
        restTime: parseInt(rowParts[13])
    }
});
console.log(reindeers.reduce((prev, curr) => {
    let timeLeft = 2503;
    let distance = 0;
    while(timeLeft > 0) {
        const newFlyTime = timeLeft > curr.flyTime ? curr.flyTime : timeLeft;
        distance += newFlyTime * curr.flySpeed;
        timeLeft -= (curr.flyTime + curr.restTime);
    }
    return distance > prev ? distance : prev;
}, 0));
