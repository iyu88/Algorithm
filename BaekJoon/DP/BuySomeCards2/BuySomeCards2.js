const fs = require("fs");
let [num, arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
arr = arr.split(" ").map(Number);
let first = Number(arr.shift());
let dp = [0, first];

for (let i = 2; i <= N; i++) {
  dp[i] = arr[i - 2];
  for (let j = 1; j < i; j++) {
    dp[i] = Math.min(dp[i], dp[i - j] + dp[j]);
  }
}

console.log(dp[N]);
