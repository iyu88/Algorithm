const fs = require("fs");
const [N, a, b] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const dp = Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
  dp[i] = dp[i - 1] + 1;

  if (i - 1 - a >= 0) {
    dp[i] = Math.min(dp[i], dp[i - 1 - a] + 1);
  }

  if (i - 1 - b >= 0) {
    dp[i] = Math.min(dp[i], dp[i - 1 - b] + 1);
  }
}

console.log(dp[N]);
