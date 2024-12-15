const input = require('./input.json');
const isSafe = (aReport) => {
    for (let i = 1; i < aReport.length; i++) {
        const dist = aReport[i] - aReport[i - 1];
        const prevDist = i > 1 ? aReport[i - 1] - aReport[i - 2] : dist;
        if (Math.abs(dist) < 1 || Math.abs(dist) > 3 || dist * prevDist < 0) {
            return false;
        }
    }
    return true;
}
const safeReports = input.data.filter((aReport) => {
    return isSafe(aReport) || aReport.some((aLevel, idx) => isSafe([...aReport.slice(0, idx), ...aReport.slice(idx+1)]));
});
console.log(safeReports.length);