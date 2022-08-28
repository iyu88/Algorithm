const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = Infinity;
arr = arr.map((el) => el.split(" ").map(Number));

for (let i = 0; i < 3; i++) {
  let dp = Array(N)
    .fill(null)
    .map((el) => Array(3).fill(Infinity));
  dp[0][i] = arr[0][i];
  for (let j = 1; j < N; j++) {
    dp[j][0] = arr[j][0] + Math.min(dp[j - 1][1], dp[j - 1][2]);
    dp[j][1] = arr[j][1] + Math.min(dp[j - 1][0], dp[j - 1][2]);
    dp[j][2] = arr[j][2] + Math.min(dp[j - 1][1], dp[j - 1][0]);
  }

  for (let j = 0; j < 3; j++) {
    if (j !== i) answer = Math.min(dp[N - 1][j], answer);
  }
}

console.log(answer);
