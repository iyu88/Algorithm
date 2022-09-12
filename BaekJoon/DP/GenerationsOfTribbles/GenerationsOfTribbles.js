const fs = require("fs");
let [num, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

let dp = [1, 1, 2, 4];

for (let i = 4; i < 70; i++) {
  dp[i] =
    BigInt(dp[i - 1]) +
    BigInt(dp[i - 2]) +
    BigInt(dp[i - 3]) +
    BigInt(dp[i - 4]);
}

console.log(arr.map((el) => dp[el].toString()).join("\n"));
