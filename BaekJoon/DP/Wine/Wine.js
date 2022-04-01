const fs = require("fs");
let [num, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => +el);

let N = +num;
if (N < 3) {
  console.log(arr.reduce((acc, cur) => acc + cur, 0));
} else {
  let dp = Array(N).fill(0);
  dp[1] = arr[0];
  dp[2] = dp[1] + arr[1];

  for (let i = 3; i <= N; i++) {
    dp[i] = Math.max(
      dp[i - 3] + arr[i - 2] + arr[i - 1],
      dp[i - 2] + arr[i - 1],
      dp[i - 1]
    );
  }
  console.log(dp[N]);
}
