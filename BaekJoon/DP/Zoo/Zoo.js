const fs = require("fs");
let N = fs.readFileSync("/dev/stdin").toString() * 1;

let dp = [1, 3];
if (N === 1) {
  console.log(dp[N]);
} else {
  for (let i = 2; i <= N; i++) {
    dp[i] = (dp[i - 1] * 2 + dp[i - 2]) % 9901;
  }
  console.log(dp[N]);
}
