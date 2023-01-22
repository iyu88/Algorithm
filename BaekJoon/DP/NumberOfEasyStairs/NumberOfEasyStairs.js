const fs = require('fs');
const N = +fs.readFileSync('/dev/stdin').toString().trim();

const MOD = 1000000000;
const dp = Array.from(Array(N+1), () => Array(10).fill(null));

for (let i = 0 ; i < 10 ; i++) dp[1][i] = 1;

dp[1][0] = 0;

for (let i = 2 ; i <= N ; i++) {
    for (let j = 0 ; j < 10 ; j++) {
        dp[i][j] = 0;
        if (j >= 1) dp[i][j] += dp[i-1][j-1];
        if (j <= 8) dp[i][j] += dp[i-1][j+1];
        dp[i][j] %= MOD;
    }
}

console.log(dp[N].reduce((acc, cur) => acc + cur, 0) % MOD);
