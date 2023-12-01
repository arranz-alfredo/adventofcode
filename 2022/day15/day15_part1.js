const input = require('./input.json');
const manhattanDistance = (start, end) => Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);
const nonValidPositions = {};
const sensors = {};
const beacons = {};
input.data.forEach((aRow) => {
    const parts = aRow.split(' ');
    start = [
        parseInt(parts[2].split('x=')[1].replace(/.$/, "")),
        parseInt(parts[3].split('y=')[1].replace(/.$/, ""))
    ];
    end = [
        parseInt(parts[8].split('x=')[1].replace(/.$/, "")),
        parseInt(parts[9].split('y=')[1])
    ];
    sensors[`${start[0]}_${start[1]}`] = [start[0], start[1], manhattanDistance(start, end)];
    beacons[`${end[0]}_${end[1]}`] = true;
});
Object.keys(sensors).forEach((aKey) => {
    const yDist = Math.abs(2000000 - sensors[aKey][1]);
    if (yDist <= sensors[aKey][2]) {
        if (sensors[`${sensors[aKey][0]}_2000000`] == null && beacons[`${sensors[aKey][0]}_2000000`] == null) {
            nonValidPositions[`${sensors[aKey][0]}_2000000`] = true;
        }
        deltaX = sensors[aKey][2] - yDist;
        for (let i = 1; i <= deltaX; i++) {
            if (sensors[`${sensors[aKey][0] + i}_2000000`] == null && beacons[`${sensors[aKey][0] + i}_2000000`] == null) {
                nonValidPositions[`${sensors[aKey][0] + i}_2000000`] = true;
            }
            if (sensors[`${sensors[aKey][0] - i}_2000000`] == null && beacons[`${sensors[aKey][0] - i}_2000000`] == null) {
                nonValidPositions[`${sensors[aKey][0] - i}_2000000`] = true;
            }
        }
    }
});
console.log(Object.keys(nonValidPositions).length);