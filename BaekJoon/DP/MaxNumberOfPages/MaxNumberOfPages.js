const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = nums.split(' ').map(Number);
const chapters = inputs.map(el => el.split(' ').map(Number));
const dp = Array.from({length: M+1}, () => Array.from({length: N+1}, () => 0));

for (let i = 1; i < M+1 ; i++) {
    const [days, pages] = chapters[i-1];
    for (let j = 1; j < N+1 ; j++) {
        if (j < days) dp[i][j] = dp[i-1][j];
        else dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-days] + pages);
    }
}

console.log(dp[M][N]);
