const input = require('./input.json');
let sum = 0;
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
                        if ((input.data[yAux][xAux] < '0' || input.data[yAux][xAux] > '9') && input.data[yAux][xAux] !== '.') {
                            sum += parseInt(aRow.substring(xIdx, endPos + 1));
                        }
                    }
                } 
            }
            xIdx = endPos;
        }
    }
});
console.log(sum);