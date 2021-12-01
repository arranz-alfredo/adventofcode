const input = require('./input.json');
const rules = {};
let rowIdx = 0;
while (input.data[rowIdx] !== '') {
    const ruleParts = input.data[rowIdx].split(':');
    rules[ruleParts[0]] = ruleParts[1].trim().split('|').map(aPart => aPart.trim().split(' '));
    rowIdx++;
}
const processRule = (rule) => {
    for(let i = 0; i < rule.length; i++) {
        for (let j = 0; j < rule[i].length; j++) {
            if (rule[i][j] !== 'a' && rule[i][j] !== 'b') {
                for (let k = 1; k < rules[rule[i][j]].length; k++) {
                    const aux = rule[i].slice();
                    aux.splice(j, 1, ...rules[rule[i][j]][k]);
                    rule.push(aux)
                }
                rule[i].splice(j, 1, ...rules[rule[i][j]][0])
                j--;
            }
        }
    }
}
processRule(rules['0']);
const validDic = {};
validStrings = rules[0].map(aSubrule => aSubrule.join('')).forEach(aValidString => {
    validDic[aValidString] = true;
});
rowIdx++;
console.log(input.data.slice(rowIdx).filter(aRow => validDic[aRow]).length);