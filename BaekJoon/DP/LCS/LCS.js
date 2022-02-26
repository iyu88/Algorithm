const fs = require("fs");
let [s1, s2] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(""));

let dp = Array.from(Array(s1.length + 1), () => Array(s2.length + 1).fill(0)); // 공집합 표현

for (let y = 1; y <= s1.length; y++) {
  for (let x = 1; x <= s2.length; x++) {
    if (s1[y - 1] === s2[x - 1]) {
      dp[y][x] = dp[y - 1][x - 1] + 1;
    } else {
      dp[y][x] = Math.max(dp[y - 1][x], dp[y][x - 1]);
    }
  }
}

console.log(dp[s1.length][s2.length]);
