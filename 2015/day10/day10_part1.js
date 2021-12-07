const input = require('./input.json');
let theString = input.data;
for (let i = 0; i < 40; i++) {
    //console.log(theString);
    const auxArr = theString.split('');
    theString = '';
    let idx = 1;
    let char = auxArr[0];
    let counter = 1;
    while (idx < auxArr.length) {
        while (char === auxArr[idx]) {
            counter += 1;
            idx += 1;
        }
        theString += `${counter}${char}`;
        counter = 1;
        char = auxArr[idx];
        idx++;
    }
    theString += `${counter}${char}`;
}
console.log(theString.length);