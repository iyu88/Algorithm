const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [C, N] = nums.split(' ').map(Number);
const dp = Array.from({length: 1000}, () => Infinity);

dp[0] = 0;

for (let i = 1; i <= C; i++) {
    for (let j = 0; j < N; j++) {
        const index = i - inputs[j];
        if (index < 0 || dp[index] === Infinity) continue;
        dp[i] = Math.min(dp[i], dp[index] + 1);
    }
}

console.log(dp[C]);
