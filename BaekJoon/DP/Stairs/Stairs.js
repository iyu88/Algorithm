const fs = require("fs");
let [num, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => +el);

let dp = [];
dp[0] = arr[0];
dp[1] = Math.max(arr[0] + arr[1], arr[1]);
dp[2] = Math.max(arr[0] + arr[2], arr[1] + arr[2]);

for (let i = 3; i < num; i++) {
  dp[i] = Math.max(arr[i] + dp[i - 2], arr[i] + arr[i - 1] + dp[i - 3]);
}

console.log(dp[num - 1]);
