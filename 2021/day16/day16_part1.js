const input = require ('./input.json');
const transmission = input.data.split('').map(aValue => parseInt(aValue, 16).toString(2).padStart(4, '0')).join('');
const process = (stream) => {
    let versionSum = parseInt(stream.substring(0, 3), 2);
    if (stream.substring(3, 6) === '100') {
        let newStream = stream.substring(6);
        while (newStream[0] === '1') {
            newStream = newStream.substring(5);
        }
        return [versionSum, newStream.substring(5)];
    } else {
        if (stream[6] === '0') {
            const packetsLength = parseInt(stream.substring(7, 22), 2);
            let newStream = stream.substring(22);
            while ((stream.substring(22).length - newStream.length) < packetsLength) {
                const childData = process(newStream);
                versionSum += childData[0];
                newStream = childData[1];
            }
            return [versionSum, newStream];
        } else {
            const packetsNumber = parseInt(stream.substring(7, 18), 2);
            let newStream = stream.substring(18);
            for (let i = 0; i < packetsNumber; i++) {
                const childData = process(newStream);
                versionSum += childData[0];
                newStream = childData[1];
            }
            return [versionSum, newStream];
        }
    }
};
let versionSumTotal = process(transmission);
console.log(versionSumTotal[0]);