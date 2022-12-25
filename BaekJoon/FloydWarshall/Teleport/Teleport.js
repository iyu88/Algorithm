const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = [];
const [N, T] = nums.split(' ').map(Number);
const dp = Array(N).fill(null).map(el => Array(N).fill(Infinity));
const info = arr.slice(0, N).map(el => el.split(' ').map(Number));
const relations = arr.slice(N+1);

const calcDist = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

for (let i = 0 ; i < N ; i++) {
    const [s1, x1, y1] = info[i];
    for (let j = 0 ; j < N ; j++) {
        if (i === j) continue;
        const [s2, x2, y2] = info[j];
        let dist = calcDist(x1, y1, x2, y2);
        if (s1 && s2) {
            dist = Math.min(T, dist);
        }
        dp[i][j] = dist;
    }
}

for (let k = 0 ; k < N ; k++) {
    for (let i = 0 ; i < N ; i++) {
        for (let j = 0 ; j < N ; j++) {
            if (i === j) continue;
            dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j]);
        }
    }
}

relations.forEach(el => {
    const [from, to] = el.split(' ').map(el2 => el2 - 1);
    answer.push(dp[from][to]);
});

console.log(answer.join('\n'));
