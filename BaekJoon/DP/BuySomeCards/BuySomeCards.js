const fs = require("fs");
let [num, arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
arr = arr.split(" ").map((el) => +el);
let dp = Array(N + 1).fill(0);
dp[1] = arr[0];

for (let i = 2; i <= N; i++) {
  dp[i] = arr[i - 1];
  for (let j = 1; j <= i; j++) {
    dp[i] = Math.max(dp[i - j] + dp[j], dp[i]);
  }
}

console.log(dp[N]);
