const input = require('./input.json');
const dicPoints = {};
input.data.forEach(aRow => {
    const lineParts = aRow.split(' -> ');
    const originParts = lineParts[0].split(',').map(aCoord => parseInt(aCoord));
    const destParts = lineParts[1].split(',').map(aCoord => parseInt(aCoord));
    while (originParts[0] !== destParts[0] || originParts[1] !== destParts[1]) {
        if (dicPoints[`${originParts[0]},${originParts[1]}`] == null) {
            dicPoints[`${originParts[0]},${originParts[1]}`] = 1;
        } else {
            dicPoints[`${originParts[0]},${originParts[1]}`] += 1;
        }
        originParts[0] += originParts[0] < destParts[0] ? 1 : (originParts[0] > destParts[0] ? -1 : 0);
        originParts[1] += originParts[1] < destParts[1] ? 1 : (originParts[1] > destParts[1] ? -1 : 0);
    }
    if (dicPoints[`${originParts[0]},${originParts[1]}`] == null) {
        dicPoints[`${originParts[0]},${originParts[1]}`] = 1;
    } else {
        dicPoints[`${originParts[0]},${originParts[1]}`] += 1;
    }        
});
console.log(Object.keys(dicPoints).filter((aCellId) => dicPoints[aCellId] >= 2).length);
