const fs = require('fs');
const [nums, songs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, S, M] = nums.split(' ').map(Number);
const T = songs.split(' ').map(Number);
const dp = Array.from({length: N+1}, () => Array.from({length: M+1}, () => false));

dp[0][S] = true;

for (let i = 1; i <= N; i++) {
    for (let j = 0; j <= M; j++) {
        if (dp[i-1][j] === false) continue;
        if (j - T[i-1] >= 0) dp[i][j - T[i-1]] = true;
        if (j + T[i-1] <= M) dp[i][j + T[i-1]] = true;
    }
}

console.log(dp[N].lastIndexOf(true));
