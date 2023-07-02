const fs = require('fs');
const N = +fs.readFileSync('/dev/stdin').toString();

const dp = Array(N+1).fill(Infinity);
dp[0] = 0;
dp[1] = 1;
dp[2] = 1;
dp[5] = 1;
dp[7] = 1;

for (let i = 1 ; i <= N ; i++) {
    if (dp[i-1]) dp[i] = Math.min(dp[i], dp[i-1] + 1);
    
    if (dp[i-2]) dp[i] = Math.min(dp[i], dp[i-2] + 1);
    
    if (dp[i-5]) dp[i] = Math.min(dp[i], dp[i-5] + 1);
    
    if (dp[i-7]) dp[i] = Math.min(dp[i], dp[i-7] + 1);
}

console.log(dp[N]);
