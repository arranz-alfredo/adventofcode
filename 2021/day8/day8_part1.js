const input = require('./input.json');
console.log(
    input.data.map(aRow => aRow.split('|')[1])
        .reduce(
            (prev, curr) => prev + curr.trim().split(' ')
                .reduce(
                    (prev2, curr2) => prev2 + (curr2.length === 5 || curr2.length === 6 ? 0 : 1),
                    0
                ),
                0
        )
);