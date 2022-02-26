const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, K] = nums.split(" ").map((el) => +el);
let things = arr.map((el) => el.split(" ").map((el2) => +el2));

let dp = Array.from(Array(N + 1), () => Array(K + 1).fill(0));

for (let y = 1; y < N + 1; y++) {
  let [w, v] = things[y - 1];
  for (let x = 1; x < K + 1; x++) {
    if (x < w) {
      dp[y][x] = dp[y - 1][x];
    } else {
      dp[y][x] = Math.max(dp[y - 1][x], dp[y - 1][x - w] + v);
    }
  }
}

console.log(dp[N][K]);
