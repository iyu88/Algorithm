const fs = require("fs");
let [num, temp] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let arr = temp.split(" ").map((el) => +el);
let dp = Array(N).fill(1);

for (let i = 1; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[i] > arr[j]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}

console.log(Math.max(...dp));
