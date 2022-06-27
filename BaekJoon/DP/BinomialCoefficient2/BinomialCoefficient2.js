const fs = require("fs");
let [N, K] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let dp = Array(N + 1)
  .fill(null)
  .map((el) => Array(N + 1).fill(0));

for (let y = 0; y <= N; y++) {
  for (let x = 0; x <= y; x++) {
    if (y === x || x === 0) dp[y][x] = 1;
    else dp[y][x] = (dp[y - 1][x - 1] + dp[y - 1][x]) % 10007;
  }
}

console.log(dp[N][K]);
