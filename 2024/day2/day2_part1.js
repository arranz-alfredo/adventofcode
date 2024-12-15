const input = require('./input.json');
const safeReports = input.data.filter((aReport) => {
    for (let i = 1; i < aReport.length; i++) {
        const dist = aReport[i] - aReport[i - 1];
        const prevDist = i > 1 ? aReport[i - 1] - aReport[i - 2] : dist;
        if (Math.abs(dist) < 1 || Math.abs(dist) > 3 || dist * prevDist < 0) {
            return false;
        }
    }
    return true;
});
console.log(safeReports.length);