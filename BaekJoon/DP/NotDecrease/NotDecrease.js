const fs = require('fs');
const [N, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

let sum;
const MAX = Math.max(...arr);
const dp = Array.from(Array(MAX), () => Array(11).fill(1));
dp[0][10] = 10;

for (let i = 1; i < MAX; i++) {
    sum = 1;
    for (let j = 1; j < 10; j++) {
        dp[i][j] = dp[i][j-1] + dp[i-1][j];
        sum += dp[i][j];
    }
    dp[i][10] = sum;
}

console.log(arr.map(el => dp[el-1][10]).join('\n'));
