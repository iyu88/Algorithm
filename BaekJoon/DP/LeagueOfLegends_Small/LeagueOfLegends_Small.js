const fs = require('fs');
const [N, M] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

const dp = [];
const MOD = 1000000007;
dp[0] = 1;

for (let i = 1; i <= N; i++) {
    dp[i] = (dp[i-1] + (i-M < 0 ? 0 : dp[i-M])) % MOD;
}

console.log(dp[N]);