const fs = require('fs');
let num = fs.readFileSync('/dev/stdin').toString() * 1;

let dp = [0, 0];

for (let i = 2; i <= num; i++) {
    dp[i] = dp[i-1] + 1;
    if (i % 2 === 0) {
        dp[i] = Math.min(dp[i / 2] + 1, dp[i]);
    }
    if (i % 3 === 0) {
        dp[i] = Math.min(dp[i / 3] + 1, dp[i]);
    }
}

console.log(dp[num]);
