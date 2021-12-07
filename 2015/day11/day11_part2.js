const input = require('./input.json');
const letters = [];
Array(26).fill('').forEach((value, idx) => {
    letters[idx] = String.fromCharCode(97 + idx);
})

const increment = (password, position) => {
    const newCode = password.charCodeAt(position) + 1;
    if (newCode === 123) {
        const newPassword = password.split('');
        newPassword.splice(position, 1, 'a');
        return increment(newPassword.join(''), position - 1);
    } else {
        const newPassword = password.split('')
        newPassword.splice(position, 1, String.fromCharCode(newCode));
        return newPassword.join('');
    }
};

const checkFirst = (password) => {
    return password.split('').some((char, idx) => (
        idx >= 2 &&
        password.charCodeAt(idx) === password.charCodeAt(idx - 1) + 1 &&
        password.charCodeAt(idx) === password.charCodeAt(idx - 2) + 2
    ));
};

const checkSecond = (password) => {
    return (
        password.indexOf('i') === -1 &&
        password.indexOf('o') === -1 &&
        password.indexOf('l') === -1
    );
};

const checkThird = (password) => {
    let idx = 0;
    let count = 0;
    while (idx < letters.length && count < 2) {
        const regexp = new RegExp(`${letters[idx]+letters[idx]}`);
        if (password.indexOf(`${letters[idx]+letters[idx]}`) >= 0) {
            password = password.replace(regexp, '..');
            count += 1;
        } else {
            idx += 1;
        }
    }
    return count === 2;
};

const checkValid = (password) => {
    return checkFirst(password) && checkSecond(password) && checkThird(password);
};

let newPassword = increment(input.data, input.data.length - 1);
while(!checkValid(newPassword)) {
    newPassword = increment(newPassword, newPassword.length - 1);
}
newPassword = increment(newPassword, input.data.length - 1);
while(!checkValid(newPassword)) {
    newPassword = increment(newPassword, newPassword.length - 1);
}

console.log(newPassword);