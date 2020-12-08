const input = require('./input.json');
let currentFloor = 0;
for(let i = 0; i < input.data.length; i++) {
    currentFloor += input.data[i] === '(' ? 1 : -1;
    if(currentFloor < 0) {
        console.log(i + 1);
        break;
    }
}