const input = require('./input.json');

const getFullValue = (expression, startPos) => {
    let valueStr = expression[startPos];
    let posAux = startPos + 1;
    while (posAux < expression.length && !isNaN(parseInt(expression[posAux]))) {
        valueStr += expression[posAux];
        posAux += 1;
    }
    return [parseInt(valueStr), valueStr.length];
};

const getPreviousValue = (expression, fromPos) => {
    let posAux = fromPos - 2;
    while (posAux >= 0) {
        if (!isNaN(parseInt(expression[posAux]))) {
            let iniPos = posAux
            while (!isNaN(parseInt(expression[iniPos]))) {
                iniPos -= 1;
            }
            iniPos += 1;
            return [parseInt(expression.substring(iniPos, posAux + 1)), iniPos, posAux - iniPos + 1];
        }
        posAux -= 1;
    }
    return [null, -1];
};

const getNextValue = (expression, fromPos) => {
    let posAux = fromPos;
    while (posAux < expression.length) {
        if (!isNaN(parseInt(expression[posAux]))) {
            const [nextValue, nextValueLength] = getFullValue(expression, posAux);
            return [nextValue, posAux, nextValueLength];
        }
        posAux += 1;
    }
    return [null, -1];
};

const process = (expression) => {
    let result = expression;
    let groupCount = 0;
    let pos = 0;
    let mustSplit = false;
    let splitPos = -1;
    while (pos < expression.length) {
        if (expression[pos] === '[') {
            groupCount += 1;
        } else if (expression[pos] === ']') {
            groupCount -= 1;
        } else if (expression[pos] !== ',') {
            if (groupCount === 5) {
                const [leftValue, leftValueLength] = getFullValue(expression, pos);
                const [rightValue, rightValueLength] = getFullValue(expression, pos + leftValueLength + 1);
                const [prevValue, prevValuePos, previousValueLength] = getPreviousValue(expression, pos);
                const [nextValue, nextValuePos, nextValueLength] = getNextValue(expression, pos + leftValueLength + 1 + rightValueLength);
                let resultAux = prevValuePos !== -1 ?
                    (result.substring(0, prevValuePos) + (leftValue + prevValue).toString() + result.substring(prevValuePos + previousValueLength, pos - 1))
                    : (result.substring(0, pos - 1));
                resultAux += '0';
                resultAux += nextValuePos !== -1 ?
                    (expression.substring(pos + leftValueLength + 1 + rightValueLength + 1, nextValuePos) + (rightValue + nextValue).toString()) + result.substring(nextValuePos + nextValueLength)
                    : (expression.substring(pos + leftValueLength + 1 + rightValueLength + 1));
                result = resultAux;
                return process(result);
            } else {
                const [value, valueLength] = getFullValue(expression, pos);
                if (!mustSplit && value >= 10) {
                    mustSplit = true;
                    splitPos = pos;
                }
            }
        }
        pos += 1;
    }
    if (mustSplit) {
        const [value, valueLength] = getFullValue(expression, splitPos);
        result = result.substring(0, splitPos) +
            '[' + Math.floor(value / 2).toString() + ',' + Math.ceil(value / 2).toString() + ']' +
            result.substring(splitPos + valueLength);
        return process(result);
    }
    return result;
};

const getMagnitude = (expression) => {
    const leftValue = typeof expression[0] === 'object' ? getMagnitude(expression[0]) : expression[0];
    const rightValue = typeof expression[1] === 'object' ? getMagnitude(expression[1]) : expression[1];
    return (3 * leftValue) + (2 * rightValue);
};

let maxMagnitude = 0;
for (let i = 0; i < input.data.length; i++) {
    for (let j = 0; j < input.data.length; j++) {
        if (i !== j) {
            let sum = `[${input.data[i]},${input.data[j]}]`;
            sum = process(sum);
            jsonSum = JSON.parse(sum);
            const magnitude = getMagnitude(jsonSum);
            if (maxMagnitude < magnitude) {
                maxMagnitude = magnitude;
            }
        }
    }
}
console.log(maxMagnitude);