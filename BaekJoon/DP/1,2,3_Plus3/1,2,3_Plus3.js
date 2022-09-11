const fs = require("fs");
let [num, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

let max = Math.max(...arr);
let dp = [0, 1, 2, 4];

for (let i = 4; i <= max; i++) {
  dp[i] = (dp[i - 3] + dp[i - 2] + dp[i - 1]) % 1000000009;
}

console.log(arr.map((el) => dp[el]).join("\n"));
