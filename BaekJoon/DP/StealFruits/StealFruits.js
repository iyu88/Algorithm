const fs = require('fs');
const [N, M] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

const dp = Array(N).fill(null).map(el => Array(M).fill(0));
dp[0] = Array(M).fill(1);

for (let i = 1; i < N; i++) {
    for (let j = i; j < M; j++) {
        let sum = 0;
        for (let k = 0 ; k <= j-1; k++) sum += dp[i-1][k];
        dp[i][j] = sum;
    }
}

console.log(dp[N-1][M-1]);
