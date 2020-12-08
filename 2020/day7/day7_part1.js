const input = require('./input.json');
const relations = {};
const process = {};
input.data.forEach(aRow => {
    rowParts = aRow.split(' contain ');
    parentParts = rowParts[0].split(' ');
    parentColor = parentParts[0] + ' ' + parentParts[1];
    if(relations[parentColor] == null) {
        relations[parentColor] = {
            code: parentColor,
            parents: []
        }
    }
    childParts = rowParts[1].split(',');
    childParts.forEach(aChild => {
        const aChildParts = aChild.split(' ');
        const childColor = aChildParts[aChildParts.length - 3] + ' ' + aChildParts[aChildParts.length - 2];
        if (relations[childColor] == null) {
            relations[childColor] = {
                code: childColor,
                parents: [relations[parentColor]]
            }
        } else {
            relations[childColor].parents.push(relations[parentColor]);
        }
    });    
});
const processNode = aNode => {
    relations[aNode.code].parents.forEach(aParent => {
        if (process[aParent.code] == null) {
            process[aParent.code] = true;
            processNode(aParent);
        }
    });
}
processNode(relations['shiny gold']);
console.log(Object.keys(process).length);