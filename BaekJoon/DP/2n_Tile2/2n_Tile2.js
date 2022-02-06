const fs = require("fs");
let num = fs.readFileSync("/dev/stdin").toString() * 1;

let dp = [0, 1, 3];
for (let i = 3; i <= num; i++) {
  dp[i] = BigInt(dp[i - 1]) * BigInt(2);
  if (i % 2) {
    dp[i] = (dp[i] - BigInt(1)) % BigInt(10007);
  } else {
    dp[i] = (dp[i] + BigInt(1)) % BigInt(10007);
  }
}

console.log(dp[num].toString());
