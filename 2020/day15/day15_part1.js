const spokenNumbers = {
    8: 1,
    13: 2,
    1: 3,
    0: 4,
    18: 5
};
let lastSpoken = 9;
let newSpoken = null;
let currentTurn = 7;
while(currentTurn <= 2020) {
    newSpoken = spokenNumbers[lastSpoken] == null ? 0 : currentTurn - 1 - spokenNumbers[lastSpoken];
    spokenNumbers[lastSpoken] = currentTurn - 1;
    lastSpoken = newSpoken;
    currentTurn++;        
}
console.log(lastSpoken);