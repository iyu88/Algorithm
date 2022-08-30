const fs = require("fs");
let [num, count, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let N = +num;
let answer = Array(N).fill(0);
let C = +count;
let dp = Array.from(Array(N), () => Array(N).fill(Infinity));
arr.forEach((el) => {
  let [from, to] = el.split(" ").map((el2) => el2 - 1);
  if (dp[from][to] === Infinity) dp[from][to] = 1;
});

for (let k = 0; k < N; k++) {
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (k !== y && y !== x)
        dp[y][x] = Math.min(dp[y][x], dp[y][k] + dp[k][x]);
    }
  }
}

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (y === x) continue;
    if (dp[y][x] === Infinity && dp[x][y] === Infinity) answer[x]++;
  }
}

console.log(answer.join("\n"));
