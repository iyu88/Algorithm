const fs = require('fs');
const [_, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

const MAX = Math.max(...arr);
const dp = Array(MAX+1).fill(1);

for (let i = 2; i <= MAX; i++) {
    dp[i] += dp[i-2];
}

for (let i = 3; i <= MAX; i++) {
    dp[i] += dp[i-3];
}

console.log(arr.map(el => dp[el]).join('\n'));
