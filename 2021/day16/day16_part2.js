const input = require('./input.json');
const transmission = input.data.split('').map(aValue => parseInt(aValue, 16).toString(2).padStart(4, '0')).join('');
const process = (stream) => {
    if (stream.substring(3, 6) === '100') {
        let newStream = stream.substring(6);
        let literal = newStream.substring(1, 5);
        while (newStream[0] === '1') {
            newStream = newStream.substring(5);
            literal += newStream.substring(1, 5);
        }
        return [parseInt(literal, 2), newStream.substring(5)];
    } else {
        const childValues = [];
        let newStream = '';
        if (stream[6] === '0') {
            const packetsLength = parseInt(stream.substring(7, 22), 2);
            newStream = stream.substring(22);
            while ((stream.substring(22).length - newStream.length) < packetsLength) {
                const childData = process(newStream);
                childValues.push(childData[0]);
                newStream = childData[1];
            }
        } else {
            const packetsNumber = parseInt(stream.substring(7, 18), 2);
            newStream = stream.substring(18);
            for (let i = 0; i < packetsNumber; i++) {
                const childData = process(newStream);
                childValues.push(childData[0]);
                newStream = childData[1];
            }
        }
        const operator = parseInt(stream.substring(3, 6), 2);

        let returnValue;
        if (operator === 0) {
            returnValue = childValues.reduce((prev, curr) => prev + curr, 0);
        } else if (operator === 1) {
            returnValue = childValues.reduce((prev, curr) => prev * curr, 1);
        } else if (operator === 2) {
            returnValue = childValues.reduce((prev, curr) => (prev > curr ? curr : prev), Number.MAX_SAFE_INTEGER);
        } else if (operator === 3) {
            returnValue = childValues.reduce((prev, curr) => (prev < curr ? curr : prev), 0);
        } else if (operator === 5) {
            returnValue = childValues[0] > childValues[1] ? 1 : 0;
        } else if (operator === 6) {
            returnValue = childValues[0] < childValues[1] ? 1 : 0;
        } else if (operator === 7) {
            returnValue = childValues[0] === childValues[1] ? 1 : 0;
        }
        return [returnValue, newStream];
    }
}
let result = process(transmission);
console.log(result[0]);
