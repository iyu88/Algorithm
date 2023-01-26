const fs = require('fs');
const [num, input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const arr = input.split(' ').map(Number);
const dp = Array(N).fill(0);

for (let i = 0; i < N; i++) {
    dp[i] = 1;
    for (let j = 0; j < N; j++) {
        if (arr[i] > arr[j] && dp[i] < dp[j] + 1) dp[i] = dp[i] + 1;
    }
}

console.log(Math.max(...dp));
