const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +inputs[0];
const L = [0].concat(inputs[1].split(' ').map(Number));
const J = [0].concat(inputs[2].split(' ').map(Number));

const dp = Array(N+1).fill(null).map(_ => Array(101).fill(0));

for (let i = 1 ; i <= N ; i++) {
    for (let j = 1 ; j <= 100 ; j++) {
        // 체력이 남아있는 경우 
        if (L[i] <= j) {
            dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-L[i]] + J[i]);
        } else {
            dp[i][j] = dp[i-1][j];
        }
    }
}

console.log(dp[N][99]);
