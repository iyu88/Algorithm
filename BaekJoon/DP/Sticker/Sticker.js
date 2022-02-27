const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
while (arr.length) {
  let len = arr.shift();
  let temp = arr.splice(0, 2).map((el) => el.split(" ").map((el2) => +el2));
  let dp = Array.from(Array(2), () => Array(len).fill(0));
  for (let i = 0; i < len; i++) {
    if (!i) {
      dp[0][i] = temp[0][i];
      dp[1][i] = temp[1][i];
    } else if (i === 1) {
      dp[0][i] = temp[0][i] + temp[1][i - 1];
      dp[1][i] = temp[1][i] + temp[0][i - 1];
    } else {
      dp[0][i] = temp[0][i] + Math.max(dp[1][i - 1], dp[1][i - 2]);
      dp[1][i] = temp[1][i] + Math.max(dp[0][i - 1], dp[0][i - 2]);
    }
  }
  console.log(Math.max(dp[0][len - 1], dp[1][len - 1]));
}
