const input = require('./input.json');
let timers = input.data.split(',').map(aValue => parseInt(aValue));
for (let day = 0; day < 80; day++) {
    let newFishes = 0;
    timers = timers.map(aTimer => {
        if (aTimer === 0) {
            newFishes += 1;
            return 6;
        } else {
            return aTimer - 1;
        }
    });
    timers = [...timers, ...Array(newFishes).fill(8)];
};
console.log(timers.length);