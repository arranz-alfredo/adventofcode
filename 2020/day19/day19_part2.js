const input = require('./input.json');
const rules = {};
const processedRules = {};

let rowIdx = 0;
while (input.data[rowIdx] !== '') {
    const ruleParts = input.data[rowIdx].split(':');
    let subrules = ruleParts[1].trim();
    if (ruleParts[0] === '8') {
        subrules = "42 | 42 8";
    } else if (ruleParts[0] === '11') {
        subrules = "42 31 | 42 11 31";
    }
    rules[ruleParts[0]] = subrules.split('|').map(aPart => aPart.trim().split(' '));
    rowIdx++;
}

const isRuleComplete = (ruleId) => {
    return rules[ruleId].every(aSubRule => 
        aSubRule.every(anElement => anElement === 'a' || anElement === 'b')
    )
};

const getCompletedRules = () => Object.keys(rules).filter(aRuleKey => !processedRules[aRuleKey] && isRuleComplete(aRuleKey));

const replaceInRules = (ruleId) => {
    let processed = true
    Object.keys(rules).forEach(aRuleKey => {
        if (aRuleKey !== ruleId) {
            let newSubRules = [];
            rules[aRuleKey].forEach(aSubRule => {
                const elemIdx = aSubRule.findIndex(anElement => anElement === ruleId);
                if (elemIdx >= 0) {
                    processed = false;
                    const auxSubRules = []
                    rules[ruleId].forEach(theSubRule => {
                        const auxSubRule = [...aSubRule];
                        auxSubRule.splice(elemIdx, 1, ...theSubRule);
                        auxSubRules.push(auxSubRule);
                    })
                    newSubRules = [
                        ...newSubRules,
                        ...auxSubRules
                    ];
                } else {
                    newSubRules = [
                        ...newSubRules,
                        [...aSubRule]
                    ];
                }
            });
            rules[aRuleKey] = newSubRules;
        }
    });
    processedRules[ruleId] = processed;
}

let completedRules = getCompletedRules();
while (completedRules.length > 0) {
    completedRules.forEach((aCompletedRule) => {
        replaceInRules(aCompletedRule);
    });
    completedRules = getCompletedRules();
}

const validDic42 = {};
let length42 = 0;
rules['42'].forEach(aSubRule => {
    validDic42[aSubRule.join('')] = true;
    length42 = aSubRule.join('').length;
});

const validDic31 = {};
let length31 = 0;
rules['31'].forEach(aSubRule => {
    validDic31[aSubRule.join('')] = true;
    length31 = aSubRule.join('').length;
});

const isValid = (aString) => {
    let auxString = aString;
    let count42 = 0;
    let process42 = true;
    while (process42 && auxString.length > 0) {
        process42 = validDic42[auxString.substring(0, length42)];
        if (process42) {
            count42 += 1;
            auxString = auxString.substring(length42);
        }
    }

    if (count42 >= 2) {
        let count31 = 0;
        let process31 = true;
        while (process31 && auxString.length > 0) {
            process31 = validDic31[auxString.substring(0, length31)];
            if (process31) {
                count31 += 1;
                auxString = auxString.substring(length31);
            }
        }
        return auxString.length === 0 && count31 >= 1 && count31 < count42;
    }
    return false;
};

rowIdx++;
console.log(input.data.slice(rowIdx).filter(aRow => isValid(aRow)).length);

