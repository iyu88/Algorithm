const fs = require("fs");
let num = fs.readFileSync("/dev/stdin").toString() * 1;

let dp = [1, 1];

for (let i = 2; i <= num; i++) {
  let sum = BigInt(0);
  for (let j = 0; j < i; j++) {
    sum += BigInt(dp[j]) * BigInt(dp[i - j - 1]);
  }
  dp[i] = sum.toString();
}

console.log(dp[num]);
