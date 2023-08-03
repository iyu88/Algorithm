const fs = require("fs");
const inputs = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const N = inputs[0];
const arr = inputs.slice(1);
const dp = Array(N).fill(0);
let answer = 0;

arr.forEach((el, index) => (dp[index] = arr[index]));

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[i] > arr[j] && dp[j] + arr[i] > dp[i]) {
      dp[i] = dp[j] + arr[i];
    }
  }
  answer = Math.max(answer, dp[i]);
}

console.log(answer);
