const fs = require("fs");
let num = fs.readFileSync("/dev/stdin").toString() * 1;

let dp = [0, 1, 0, 1];

if (num > 4) {
  for (let i = 4; i <= num; i++) {
    if (dp[i - 1] || dp[i - 3] || dp[i - 4]) dp[i] = 0;
    else dp[i] = 1;
  }
}

console.log(dp[num] ? "CY" : "SK");
