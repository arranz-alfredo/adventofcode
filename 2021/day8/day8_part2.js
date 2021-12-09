const input = require('./input.json');
const numbers = {
    'abcefg': '0',
    'cf': '1',
    'acdeg': '2',
    'acdfg': '3',
    'bcdf': '4',
    'abdfg': '5',
    'abdefg': '6',
    'acf': '7',
    'abcdefg': '8',
    'abcdfg': '9'
}

const getA = (patterns) => {
    const one = patterns.find(elem => elem.length === 2);
    const seven = patterns.find(elem => elem.length === 3);
    return seven.split('').find(elem => one.indexOf(elem) === -1);
}

const codes = input.data.map(aRow => {
    const rowParts = aRow.split(' | ');
    const patterns = rowParts[0].split(' ');
    const output = rowParts[1].split(' ');

    const letterCount = {
        'a': 0,
        'b': 0,
        'c': 0,
        'd': 0,
        'e': 0,
        'f': 0,
        'g': 0
    }
    patterns.join('').split('').forEach(aLetter => {
        letterCount[aLetter] += 1;
    })
    const dicTrans = {};
    dicTrans[Object.keys(letterCount).reduce((prev, curr) => letterCount[curr] === 6 ? curr : prev, '')] = 'b';
    dicTrans[Object.keys(letterCount).reduce((prev, curr) => letterCount[curr] === 4 ? curr : prev, '')] = 'e';
    dicTrans[Object.keys(letterCount).reduce((prev, curr) => letterCount[curr] === 9 ? curr : prev, '')] = 'f';
    dicTrans[getA(patterns)] = 'a';
    dicTrans[patterns.find(elem => elem.length === 2).split('').reduce((prev, curr) => dicTrans[curr] == null ? curr : prev, '')] = 'c';
    dicTrans[patterns.find(elem => elem.length === 4).split('').reduce((prev, curr) => dicTrans[curr] == null ? curr : prev, '')] = 'd';
    dicTrans[patterns.find(elem => elem.length === 7).split('').reduce((prev, curr) => dicTrans[curr] == null ? curr : prev, '')] = 'g';
    
    return parseInt(output.reduce((prev, curr) => {
        const translation = curr.split('').map(aLetter => dicTrans[aLetter]);
        translation.sort();
        return prev + numbers[translation.join('')];
    }, ''));
});
console.log(codes.reduce((prev, curr) => prev + curr, 0));