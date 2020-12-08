const md5 = require('./md5');
const input = 'bgvyzdsv';
for(let i = 0; i < 2^50; i++) {
    if (md5.create(input + i.toString()).substring(0, 6) === '000000') {
        console.log(i);
        break;
    }
}
