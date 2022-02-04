const fs = require("fs");
let num = fs.readFileSync("/dev/stdin").toString() * 1;

let dp = [0, 1, 2];
for (let i = 3; i <= num; i++) {
  dp[i] = (BigInt(dp[i - 1]) + BigInt(dp[i - 2])) % BigInt(15746);
}

console.log(dp[num].toString());
