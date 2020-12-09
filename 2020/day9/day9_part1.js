const input = require('./input.json');
for(let i = 25; i < input.data.length; i++) {
    let found = false;
    const dic = {};
    for (j = i - 25; j < i; j++) {
        if (dic[input.data[i] - input.data[j]]) {
            found = true;
            break;
        }
        dic[input.data[j]] = true;
    }
    if (!found) {
        console.log(input.data[i]);
        break;
    }
}