const input = require('./input.json');
const scannerData = [];
let newScannerData = [];
input.data.forEach(aRow => {
    if (aRow === '') {
        scannerData.push([...newScannerData]);
        newScannerData = [];
    } else if (aRow.substring(0, 3) !== '---') {
        newScannerData.push(JSON.parse(`[${aRow}]`));
    }
})
scannerData.push([...newScannerData]);

const decToRad = (degrees) => degrees * (Math.PI / 180);
const cos = (degrees) => Math.round(Math.cos(decToRad(degrees)));
const sin = (degrees) => Math.round(Math.sin(decToRad(degrees)));

function rotate(cube, rx, ry, rz) {
    var Axx = cos(rz) * cos(ry);
    var Axy = cos(rz) * sin(ry) * sin(rx) - sin(rz) * cos(rx);
    var Axz = cos(rz) * sin(ry) * cos(rx) + sin(rz) * sin(rx);
    var Ayx = sin(rz) * cos(ry);
    var Ayy = sin(rz) * sin(ry) * sin(rx) + cos(rz) * cos(rx);
    var Ayz = sin(rz) * sin(ry) * cos(rx) - cos(rz) * sin(rx);
    var Azx = -sin(ry);
    var Azy = cos(ry) * sin(rx);
    var Azz = cos(ry) * cos(rx);

    return cube.map(aPoint => [
        Axx * aPoint[0] + Axy * aPoint[1] + Axz * aPoint[2],
        Ayx * aPoint[0] + Ayy * aPoint[1] + Ayz * aPoint[2],
        Azx * aPoint[0] + Azy * aPoint[1] + Azz * aPoint[2]
    ]);
}

function translate(cubeA, cubeB, originA, originB) {
    const dx = cubeA[originA][0] - cubeB[originB][0];
    const dy = cubeA[originA][1] - cubeB[originB][1];
    const dz = cubeA[originA][2] - cubeB[originB][2];

    return [cubeB.map(aPoint => [
        aPoint[0] + dx,
        aPoint[1] + dy,
        aPoint[2] + dz
    ]), [dx, dy, dz]];
}

let resultCube = scannerData[0];
const scannerPositions = [[0, 0, 0]];
scannerData.splice(0, 1);
let scannerIdx = 0;
while (scannerData.length > 0 && scannerIdx < scannerData.length) {
    let found = false;
    for (let x = 0; x < 4 && !found; x++) {
        for (let y = 0; y < 4 && !found; y++) {
            for (let z = 0; z < 4 && !found; z++) {
                const rotatedCube = rotate(scannerData[scannerIdx], x * 90, y * 90, z * 90);
                for (let originAIdx = 0; originAIdx < resultCube.length && !found; originAIdx++) {
                    for (let originBIdx = 0; originBIdx < rotatedCube.length && !found; originBIdx++) {
                        const [translatedCube, translateDeltas] = translate(resultCube, rotatedCube, originAIdx, originBIdx);
                        const cubeCandidate = resultCube.map(aCoord => [aCoord[0], aCoord[1], aCoord[2]]);
                        translatedCube.forEach (aCoord => {
                            if (cubeCandidate.findIndex(aCompCoord => aCoord[0] === aCompCoord[0] && aCoord[1] === aCompCoord[1] && aCoord[2] === aCompCoord[2]) === -1) {
                                cubeCandidate.push([...aCoord]);
                            }
                        })
                        if ((resultCube.length + translatedCube.length  - cubeCandidate.length) >= 12) {
                            found = true;
                            scannerPositions.push(translateDeltas);
                            resultCube = cubeCandidate;
                        }
                    }
                }
            }
        }
    }
    if (found) {
        console.log('Found', scannerIdx, scannerPositions.length);
        scannerData.splice(scannerIdx, 1);
        scannerIdx = 0;
    } else {
        scannerIdx++;
    }
}
let max = 0;
for (let i = 0; i < scannerPositions.length - 1; i++) {
    for (let j = i + 1; j < scannerPositions.length; j++) {
        let distance = 0;
        for (let k = 0; k < 3; k++) {
            distance += Math.abs(scannerPositions[i][k] - scannerPositions[j][k])
        }
        max = max < distance ? distance : max;
    }    
}
console.log(max);