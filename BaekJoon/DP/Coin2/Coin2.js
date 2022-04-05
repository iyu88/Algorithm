const fs = require("fs");
let [nums, ...temp] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, K] = nums.split(" ").map((el) => +el);
let arr = [...new Set(temp)].map((el) => +el).sort((a, b) => a - b);
let dp = Array(K + 1).fill(Infinity);
dp[0] = 0;

for (let i = 0; i < arr.length; i++) {
  for (let j = arr[i]; j <= K; j++) {
    dp[j] = Math.min(dp[j], dp[j - arr[i]] + 1);
  }
}

console.log(dp[K] === Infinity ? -1 : dp[K]);
