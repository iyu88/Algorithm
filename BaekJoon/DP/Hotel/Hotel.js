const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [C, N] = nums.split(" ").map(Number);
arr = arr.map((el) => el.split(" ").map(Number)).sort((a, b) => a[0] - b[0]);
let dp = Array(C + 1).fill(Infinity);
dp[0] = 0;

for (let [cost, head] of arr) {
  if (dp[head] > cost) dp[head] = cost;
  for (let i = 1; i <= C; i++) {
    dp[i] =
      i < head
        ? Math.min(dp[i], cost)
        : Math.min(dp[i], dp[head] + dp[i - head]);
  }
}

console.log(dp[C]);
