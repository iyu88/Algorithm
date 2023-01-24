const fs = require('fs');
const N = +fs.readFileSync('/dev/stdin').toString().trim();

const MOD = 1000000007;
const dp = [1, 0, 0, 0, 0, 0, 0, 0];

for (let i = 0 ; i < N; i++) {
    const prev = [...dp];
    dp[0] = (prev[1] + prev[2]) % MOD;
    dp[1] = (prev[0] + prev[2] + prev[3]) % MOD;
    dp[2] = (prev[0] + prev[1] + prev[3] + prev[4]) % MOD;
    dp[3] = (prev[1] + prev[2] + prev[4] + prev[5]) % MOD;
    dp[4] = (prev[2] + prev[3] + prev[5] + prev[6]) % MOD;
    dp[5] = (prev[3] + prev[4] + prev[7]) % MOD;
    dp[6] = (prev[4] + prev[7]) % MOD;
    dp[7] = (prev[5] + prev[6]) % MOD;
}

console.log(dp[0] % MOD);
