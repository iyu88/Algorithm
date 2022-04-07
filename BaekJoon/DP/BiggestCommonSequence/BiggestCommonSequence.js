const fs = require("fs");
let [num, arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
arr = arr.split(" ").map((el) => +el);
let dp = arr.slice();

for (let i = 1; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[i] > arr[j]) dp[i] = Math.max(dp[i], arr[i] + dp[j]);
  }
}

console.log(Math.max(...dp));
