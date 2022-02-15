const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let dp = Array(N);
arr.forEach((el, i) => {
  dp[i] = el.split(" ").map((el2) => +el2);
});

for (let y = 1; y < N; y++) {
  for (let x = 0; x < dp[y].length; x++) {
    dp[y][x] += Math.max(
      dp[y - 1][x] === undefined ? 0 : dp[y - 1][x],
      dp[y - 1][x - 1] === undefined ? 0 : dp[y - 1][x - 1]
    );
  }
}

console.log(Math.max(...dp[N - 1]));
