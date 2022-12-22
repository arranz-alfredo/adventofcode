const input = require('./input.json');
const monkeys = [];
input.data.forEach((aLine, idx) => {
    if (idx % 7 === 0) {
        monkeys.push({
            startingItems: input.data[idx + 1].split(' items: ')[1].split(', ').map((aWorry) => parseInt(aWorry)),
            operation: input.data[idx + 2].split(' old ')[1].split(' '),
            test: parseInt(input.data[idx + 3].split(' ')[3]),
            ifTrue: parseInt(input.data[idx + 4].split(' ')[5]),
            ifFalse: parseInt(input.data[idx + 5].split(' ')[5]),
            times: 0
        });
    }
});
for (let i = 0; i < 20; i++) {
    for (let mIdx = 0; mIdx < monkeys.length; mIdx++) {
        monkeys[mIdx].startingItems.forEach((aWorry) => {
            let newWorry = aWorry;
            if (monkeys[mIdx].operation[0] === '+') {
                newWorry = monkeys[mIdx].operation[1] === 'old' ? newWorry + newWorry : newWorry + parseInt(monkeys[mIdx].operation[1]);
            } else {
                newWorry = monkeys[mIdx].operation[1] === 'old' ? newWorry * newWorry : newWorry * parseInt(monkeys[mIdx].operation[1]);
            }
            newWorry = Math.floor(newWorry / 3);
            const toMonkey = (newWorry % monkeys[mIdx].test) === 0 ? monkeys[mIdx].ifTrue : monkeys[mIdx].ifFalse;
            monkeys[toMonkey].startingItems.push(newWorry);
            monkeys[mIdx].times++;
        });
        monkeys[mIdx].startingItems = [];
    }
}
monkeys.sort((a, b) => b.times - a.times);
console.log(monkeys[0].times * monkeys[1].times);