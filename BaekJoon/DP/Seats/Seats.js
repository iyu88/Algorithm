const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +inputs[0];
const M = +inputs[1];
const dp = [];
dp[0] = 1;
dp[1] = 1; 
dp[2] = 2;

for (let i = 3; i <= N; i++) {
    dp[i] = dp[i-1] + dp[i-2];
}

let last = 0;
let answer = 1;

for (let i = 0; i < M; i++) {
    const VIP = inputs[i+2];
    answer *= dp[VIP - last - 1];
    last = VIP;
}

console.log(answer * dp[N - last]);
