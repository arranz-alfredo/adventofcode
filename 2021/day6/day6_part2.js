const input = require('./input.json');
let dicTimers = {};
let fishCount = 0;
input.data.split(',').map(aValue => parseInt(aValue)).forEach(aTimer => {
    const key = `${aTimer},256`;
    if (dicTimers[key] == null) {
        dicTimers[key] = 1;
    } else {
        dicTimers[key] += 1;
    }
    fishCount += 1;
});

const getOffspring = (key) => {
    let [timer, daysLeft] = key.split(',').map(value => parseInt(value));
    const offspring = [];
    while (daysLeft > timer) {
        daysLeft -= (timer + 1);
        timer = 6;
        offspring.push([
            8,
            daysLeft
        ]);
    }
    return offspring;
}

let keys = Object.keys(dicTimers);
while (keys.length > 0) {
    let newDicTimers = {};
    keys.forEach(aKey => {
        auxTimers = getOffspring(aKey);
        fishCount += auxTimers.length*dicTimers[aKey];
        auxTimers.forEach(auxValue => {
            const newKey = auxValue.join(',');
            if (newDicTimers[newKey] == null) {
                newDicTimers[newKey] = dicTimers[aKey];
            } else {
                newDicTimers[newKey] += dicTimers[aKey];
            }
        })
    });
    dicTimers = newDicTimers;
    keys = Object.keys(dicTimers);
}

console.log(fishCount);
