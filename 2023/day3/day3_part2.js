const input = require('./input.json');
const gears = {};
input.data.forEach((aRow, yIdx) => {
    for (xIdx = 0; xIdx < aRow.length; xIdx++) {
        if (aRow[xIdx] >= '0' && aRow[xIdx] <= '9') {
            let endPos = xIdx;
            while(endPos < aRow.length - 1 && aRow[endPos + 1] >= '0' && aRow[endPos + 1] <= '9') {
                endPos++;
            }
            for (yAux = yIdx - 1; yAux <= yIdx + 1; yAux++) {
                for (xAux = xIdx - 1; xAux <= endPos + 1; xAux++) {
                    if (yAux >= 0 && yAux < input.data.length && xAux > 0 && xAux < aRow.length) {
                        if (input.data[yAux][xAux] === '*') {
                            const key = xAux + '_'+ yAux
                            if(gears[key] == null) {
                                gears[key] = [parseInt(aRow.substring(xIdx, endPos + 1))]
                            } else {
                                gears[key].push(parseInt(aRow.substring(xIdx, endPos + 1)))
                            }
                        }
                    }
                } 
            }
            xIdx = endPos;
        }
    }
});
const sum = Object.keys(gears).reduce((prev, curr) => {
    if (gears[curr].length === 2) {
        return prev + (gears[curr][0] * gears[curr][1]);
    } else 
    return prev;
}, 0);
console.log(sum);