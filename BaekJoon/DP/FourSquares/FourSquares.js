const fs = require('fs');
const N = +fs.readFileSync('/dev/stdin').toString().trim();

const dp = [];
dp[0] = 0;
dp[1] = 1;

for (let i = 2; i <= N; i++) {
    let min = 4;
    for (let j = 1; j**2 <= i; j++) {
        min = Math.min(min, dp[i-j**2]);
    }
    dp[i] = min + 1;
}

console.log(dp[N]);
