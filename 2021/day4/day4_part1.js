const input = require('./input.json');
const calledNumbers = input.data[0].split(',');
const boards = [];
let idxRow = 2;
while (idxRow < input.data.length) {
    const newBoard = [];
    for (let i = 0; i < 5; i++) {
        newBoard.push(...(input.data[idxRow + i].trim().replace(/  /g, ' ').split(' ')));
    }
    boards.push(newBoard);
    idxRow += 6;
}

const checkRows = (board) => {
    let idx = 0;
    while (idx < board.length) {
        if (board.slice(idx, idx + 5).every(aValue => aValue === 'x')) {
            return true;
        }
        idx += 5;
    }
    return false;
};

const checkColumns = (board) => {
    for (let i = 0; i < 5; i++) {
        if (board.filter((aValie, idx) => idx%5 === i).every(aValue => aValue === 'x')) {
            return true;
        }
    };
    return false;
};

const getBoardValue = (board) => board.reduce((prev, curr, idx) => board[idx] != 'x' ? prev + parseInt(board[idx]) : prev, 0);

let winner = -1;
numberIdx = 0;
while (winner === -1 && numberIdx < calledNumbers.length) {
    boards.forEach((aBoard, idx) => {
        if (winner === -1) {
            boards[idx] = aBoard.map(aNum => aNum === calledNumbers[numberIdx] ? 'x' : aNum);
            winner = (checkRows(boards[idx]) || checkColumns(boards[idx])) ? idx : -1;
        }
    })
    numberIdx += 1;
}
console.log(getBoardValue(boards[winner])*calledNumbers[numberIdx - 1]);
