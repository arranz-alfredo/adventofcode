const input = require('./input.json');
const relations = {};
input.data.forEach(aRow => {
    rowParts = aRow.split(' contain ');
    parentParts = rowParts[0].split(' ');
    parentColor = parentParts[0] + ' ' + parentParts[1];
    if(relations[parentColor] == null) {
        relations[parentColor] = {
            code: parentColor,
            children: []
        }
    }
    childParts = rowParts[1].split(',');
    childParts.forEach(aChild => {
        const aChildParts = aChild.split(' ');
        const childColor = aChildParts[aChildParts.length - 3] + ' ' + aChildParts[aChildParts.length - 2];
        if (childColor !== 'no other') {
            if (relations[childColor] == null) {
                relations[childColor] = {
                    code: childColor,
                    children: []
                }
            }
            relations[parentColor].children.push({
                count: parseInt(aChildParts[aChildParts.length - 4], 10),
                node: relations[childColor]
            });
        }
    });    
});
const processNode = aNode => {
    let res = 0
    aNode.children.forEach(aChild => {
        res += aChild.count + aChild.count * processNode(aChild.node);
    });
    return res;
}
let total = processNode(relations['shiny gold']);
console.log(total);