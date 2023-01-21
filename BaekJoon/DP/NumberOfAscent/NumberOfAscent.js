const fs = require('fs');
const N = +fs.readFileSync('/dev/stdin').toString().trim();

const MOD = 10007;
const dp = Array(N+1).fill(null).map(_ => Array(10).fill(0));

for (let i = 0 ; i < 10 ; i++) dp[0][i] = i+1;

for (let i = 1 ; i <= N ; i ++) {
    for (let j = 0 ; j < 10 ; j++) {
        dp[i][j] = (j === 0 ? 1 : dp[i-1][j] + dp[i][j-1]) % MOD;
    }
}

console.log(dp[N-1][9]);
