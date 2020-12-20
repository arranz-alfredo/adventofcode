const input = require('./input.json');
const fields = [];
const validationRange = [null, null];
for (let i = 0; i < 20; i++) {
    const field = {
        field: input.data[i].split(':')[0],
        ranges: input.data[i]
            .split(': ')[1]
            .split(' or ')
            .map(elem => {
                return elem.split('-').map(txtNum => parseInt(txtNum, 10))
            }),
        validPos: {}
    };
    for(let j = 0; j < 20; j++) {
        field.validPos[j] = true;
    }
    fields.push(field);
    if (validationRange[0] == null) {
        validationRange[0] = [...field.ranges[0]];
    } else {
        validationRange[0][0] > field.ranges[0][0] && (validationRange[0][0] = field.ranges[0][0]);
        validationRange[0][1] < field.ranges[0][1] && (validationRange[0][1] = field.ranges[0][1]);
    }
    if (validationRange[1] == null) {
        validationRange[1] = [...field.ranges[1]];
    } else {
        validationRange[1][0] > field.ranges[1][0] && (validationRange[1][0] = field.ranges[1][0]);
        validationRange[1][1] < field.ranges[1][1] && (validationRange[1][1] = field.ranges[1][1]);
    }
}
const checkRow = (rowData) => {
    let allValids = true;
    rowData.some(aNumber => {
        if( (aNumber < validationRange[0][0]) ||
            (aNumber > validationRange[0][1] && aNumber < validationRange[1][0] ) ||
            (aNumber > validationRange[1][1])
        ) {
            allValids = false;
            return true;
        }
    });
    return allValids;
}
for (let i = input.data.length - 1; i >= 25 ; i--) {
    const rowData = input.data[i].split(',').map(aNumberTxt => parseInt(aNumberTxt, 10));
    if (checkRow(rowData)) {
        rowData.forEach((value, valueIdx) => {
            fields.forEach(aField => {
                if (aField.validPos[valueIdx]) {
                    if (value < aField.ranges[0][0] ||
                        (value > aField.ranges[0][1] && value < aField.ranges[1][0]) ||
                        value > aField.ranges[1][1]) {
                            delete aField.validPos[valueIdx];
                    }
                }
            });
        });
    }
}
fields.sort((a, b) => Object.keys(a.validPos).length - Object.keys(b.validPos).length);
for (let i = 0; i < fields.length - 1; i++) {
    for (let j = i + 1; j < fields.length; j++) {
        Object.keys(fields[i].validPos).forEach(aValidPos => {
            fields[j].validPos[aValidPos] && delete fields[j].validPos[aValidPos];
        });
    }
}
const myTicket = input.data[22].split(',').map(aNumberTxt => parseInt(aNumberTxt));
let result = 1;
fields.filter(aField => aField.field.substring(0, 9) === 'departure')
    .forEach(aDepField => {
        result *= myTicket[Object.keys(aDepField.validPos)[0]];
    });
console.log(result);