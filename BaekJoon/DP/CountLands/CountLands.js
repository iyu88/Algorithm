const fs = require('fs');
const [nums, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = nums.split(' ').map(Number);
const dp = Array.from(Array(N+1), () => Array(M+1).fill(0));

const arr = input.splice(0, N).map(el => el.split(' ').map(Number));
const [_, ...question] = input;

for (let i = 1 ; i <= N ; i++) {
    for (let j = 1 ; j <= M ; j++) {
        dp[i][j] = dp[i-1][j] + dp[i][j-1] + arr[i-1][j-1] - dp[i-1][j-1];
    }
}

console.log(question.map(el => {
    const [y1, x1, y2, x2] = el.split(' ').map(Number);
    return dp[y2][x2] - dp[y1-1][x2] - dp[y2][x1-1] + dp[y1-1][x1-1];
}).join('\n'));
