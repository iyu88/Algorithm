const fs = require('fs');
const [N, M, O] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

let count = 1;
let [S, T] = [0, 0];
const dp = Array.from(Array(N+1), () => Array(M+1).fill(0));
dp[0][1] = 1;

for (let i = 1 ; i < N+1 ; i++) {
    for (let j = 1 ; j < M+1 ; j++) {
        if (count === O) [S, T] = [i, j];
        count++;
        dp[i][j] = dp[i-1][j] + dp[i][j-1];
    }
}

console.log(O ? dp[S][T] * dp[N-S+1][M-T+1] : dp[N][M]);
