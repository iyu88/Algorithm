const fs = require("fs");
const inputs = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const answer = [];
let index = 0;

while (index < inputs.length - 1) {
  const count = +inputs[index++];
  const nums = inputs.slice(index, index + count);
  index += count;

  const dp = Array(count).fill(0);

  dp[0] = nums[0];

  for (let i = 1; i < count; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
  }
  answer.push(Math.max(...dp));
}

console.log(answer.join("\n"));
