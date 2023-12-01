const input = require('./input.json');
const manhattanDistance = (start, end) => Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);
const sensors = [];
const beacons = {};
let found = false;
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
    sensors.push([start[0], start[1], manhattanDistance(start, end)]);
    beacons[`${end[0]}_${end[1]}`] = true;
});
const validCoord = (coord) => {
    return coord[0] >= 0 && coord[0] <= 4000000 && coord[1] >= 0 && coord[1] <= 4000000;
}
const findSensor = (coord) => {
    return sensors.find((aSensor) => aSensor[2] > manhattanDistance([aSensor[0], aSensor[1]], coord));
}
const evalCoord = (coord) => {
    if (validCoord(coord) && findSensor(coord) == null) {
        console.log(coord[0] * 4000000 + coord[1]);
        found = true;
    }
}
for (s = 0; s < sensors.length && !found; s++) {
    for (d = 0; d <= sensors[s][2] + 1 && !found; d++) {
        evalCoord([sensors[s][0] - (sensors[s][2] + 1) + d, sensors[s][1] + d]);
        evalCoord([sensors[s][0] + (sensors[s][2] + 1) - d, sensors[s][1] + d]);
        evalCoord([sensors[s][0] - (sensors[s][2] + 1) + d, sensors[s][1] - d]);
        evalCoord([sensors[s][0] + (sensors[s][2] + 1) - d, sensors[s][1] - d]);
    }
};