const fs = require("fs");
let [num, ...temp] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let N = +num;
let arr = temp.map((el) => el.split(" ").map((el2) => +el2));
let dp = Array(N).fill(0);

for (let i = 0; i < N; i++) {
  let index = i + arr[i][0];
  if (index > N) continue;
  dp[i] += arr[i][1];
  for (let j = index; j < N; j++) {
    dp[j] = Math.max(dp[j], dp[i]);
  }
}

console.log(Math.max(...dp));
