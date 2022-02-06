const fs = require("fs");
let [num, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => +el);

let answer = [];
let dp = [0, 1, 2, 4];
let step = [0, 1, 2, 3];

for (let i = 4; i <= Math.max(...arr); i++) {
  step[i] = step[i - 1] + step[i - 2] + step[i - 3];
  dp[i] = dp[i - 1] + step[i - 1];
}

arr.forEach((el) => answer.push(dp[el]));
console.log(answer.join("\n"));
