const fs = require("fs");
let [A, B] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(""));

let dp = Array(A.length + 1)
  .fill(null)
  .map((el) => Array(B.length + 1).fill(0));
let str = [];

for (let i = 1; i < A.length + 1; i++) {
  for (let j = 1; j < B.length + 1; j++) {
    if (A[i - 1] === B[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
    else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
  }
}

let y = A.length;
let x = B.length;

while (y > 0 && x > 0) {
  // 위 값 비교
  if (dp[y][x] === dp[y - 1][x]) y--;
  // 왼쪽 값 비교
  else if (dp[y][x] === dp[y][x - 1]) x--;
  else if (dp[y][x] === dp[y - 1][x - 1] + 1) {
    y--;
    x--;
    str.push(B[x]);
  }
}

console.log(str.length);
console.log(str.reverse().join(""));
