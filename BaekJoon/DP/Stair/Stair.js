const fs = require("fs");
const [num, input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = +num;
const arr = input.split(" ").map(Number);

const dp = [1];

for (let i = 1; i < N; i++) dp[i] = arr[i] > dp[i - 1] ? dp[i - 1] + 1 : arr[i];

console.log(Math.max(...dp));
