const fs = require("fs");
let [N, M] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let dp = Array(N)
  .fill(null)
  .map((el) => Array(M).fill(1));

for (let i = 1; i < N; i++) {
  for (let j = 1; j < M; j++) {
    dp[i][j] = (dp[i - 1][j] + dp[i][j - 1] + dp[i - 1][j - 1]) % 1000000007;
  }
}

console.log(dp[N - 1][M - 1]);
