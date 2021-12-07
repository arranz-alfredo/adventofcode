const input = require('./input.json');
const reindeers = input.data.map(aRow => {
    const rowParts = aRow.split(' ');
    return {
        name: rowParts[0],
        flySpeed: parseInt(rowParts[3]),
        flyTime: parseInt(rowParts[6]),
        restTime: parseInt(rowParts[13]),
        distance: 0,
        points: 0
    }
});
for (let sec = 0; sec <= 2503; sec++) {
    let maxDistance = 0;
    for (let idx = 0; idx < reindeers.length; idx++) {
        const cycleSec = sec % (reindeers[idx].flyTime + reindeers[idx].restTime);
        if (cycleSec < reindeers[idx].flyTime) {
            reindeers[idx].distance += reindeers[idx].flySpeed
        }
        if (reindeers[idx].distance > maxDistance) {
            maxDistance = reindeers[idx].distance;
        }        
    }
    reindeers.forEach(aReindeer => {
        if (aReindeer.distance === maxDistance) {
            aReindeer.points += 1
        }
    });
}
console.log(reindeers.reduce((prev, curr) => curr.points > prev ? curr.points : prev, 0));