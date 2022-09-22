const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map(Number);

arr = arr.map((el) => el.split(" ").map(Number));
let dp = Array(N + 1)
  .fill(null)
  .map((el) => Array(M + 1).fill(0));

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    dp[i][j] = arr[i - 1][j - 1] + Math.max(dp[i - 1][j], dp[i][j - 1]);
  }
}

console.log(dp[N][M]);
