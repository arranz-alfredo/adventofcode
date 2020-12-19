const input = require('./input.json');
const initTs = parseInt(input.data[0], 10);
busIds = input.data[1]
    .split(',')
    .filter(aBusId => aBusId != 'x')
    .map(aBusId => {
        return {
            id: parseInt(aBusId, 10),
            departure: parseInt(aBusId, 10) * Math.ceil(initTs / parseInt(aBusId, 10))
        }
    })
    .sort((a, b) => a.departure - b.departure);
console.log(busIds[0].id * (busIds[0].departure - initTs));