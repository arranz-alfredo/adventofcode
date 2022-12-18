const input = require('./input.json');
const dirSizes = { '': 0 };
let currentPath = [];
input.data.forEach((line) => {
    lineParts = line.split(' ');
    if (lineParts[0] === '$') {
        if (lineParts[1] === 'cd') {
            if (lineParts[2] === '/') {
                currentPath = [''];
            } else if (lineParts[2] === '..') {
                currentPath.pop();
            } else {
                currentPath.push(lineParts[2]);
                if (dirSizes[currentPath.join('/')] == null) {
                    dirSizes[currentPath.join('/')] = 0;
                }
            }
        }
    } else {
        if (lineParts[0] !== 'dir') {
            for(let i = currentPath.length; i > 0; i--) {
                dirSizes[currentPath.slice(0, i).join('/')] += parseInt(lineParts[0]);
            }
        }
    }
});
const spaceNeeded = 30000000 - (70000000 - dirSizes['']);
console.log(Object.keys(dirSizes).reduce((prev, curr) => (dirSizes[curr] < prev && dirSizes[curr] > spaceNeeded) ? dirSizes[curr] : prev, 70000000));