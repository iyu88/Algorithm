const fs = require("fs");
let [[N, M], ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map((el2) => +el2));

let dp = Array(N + 1)
  .fill(null)
  .map((el) => Array(M + 1).fill(0));

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    dp[i][j] =
      Math.max(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) +
      arr[i - 1][j - 1];
  }
}

console.log(dp[N][M]);
