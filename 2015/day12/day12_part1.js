const input = require('./input.json');

const count = (elem) => {
    if (elem.constructor === Array) {
        return elem.reduce((prev, curr) => prev + count(curr), 0);
    } else if (typeof elem === 'object') {
        return Object.keys(elem).reduce((prev, curr) => prev + count(elem[curr]), 0)
    } else if (typeof elem === 'number') {
        return elem;
    }    
    return 0;
};

console.log(count(input.data));