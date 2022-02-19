const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map((el) => +el);
let answer = [];
let map = arr.splice(0, N).map((el) => el.split(" ").map((el2) => +el2));
let points = arr.splice(0).map((el) => el.split(" ").map((el2) => el2 - 1));
let dp = Array.from(Array(N), () => []);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!i) {
      dp[i][j] = map[i][j];
      if (j) dp[i][j] += dp[i][j - 1];
    } else {
      dp[i][j] = dp[i - 1][j] + map[i][j];
      if (j) dp[i][j] = dp[i][j] + dp[i][j - 1] - dp[i - 1][j - 1];
    }
  }
}

for (let i = 0; i < M; i++) {
  let [x1, y1, x2, y2] = points[i];
  answer.push(
    dp[x2][y2] -
      (x1 - 1 >= 0 ? dp[x1 - 1][y2] : 0) -
      (y1 - 1 >= 0 ? dp[x2][y1 - 1] : 0) +
      (x1 - 1 >= 0 && y1 - 1 >= 0 ? dp[x1 - 1][y1 - 1] : 0)
  );
}

console.log(answer.join("\n"));
