const input = require('./input.json');
const connections = {};
input.data.forEach(aRow => {
    const rowParts = aRow.split('-');
    if (connections[rowParts[0]] == null) {
        connections[rowParts[0]] = [rowParts[1]];
    } else {
        connections[rowParts[0]].push(rowParts[1]);
    }
    if (connections[rowParts[1]] == null) {
        connections[rowParts[1]] = [rowParts[0]];
    } else {
        connections[rowParts[1]].push(rowParts[0]);
    }
});
const moveFrom = (cave, dicSmall) => {
    let count = 0;
    connections[cave].forEach(aConnectedCave => {
        const localDic = { ...dicSmall };
        if (aConnectedCave === 'end') {
            count += 1;
        } else if (localDic[aConnectedCave] == null) {
            if (aConnectedCave.toLowerCase() === aConnectedCave) {
                localDic[aConnectedCave] = true;
            }
            count += moveFrom(aConnectedCave, localDic);
        }
    })
    return count;
}
console.log(moveFrom('start', { start: true }));
