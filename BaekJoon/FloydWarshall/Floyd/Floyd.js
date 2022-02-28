const fs = require("fs");
let [n, m, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let N = +n;
let M = +m;
let dp = Array.from(Array(N), () => Array(N).fill(Infinity));
arr.forEach((el) => {
  let [from, to, cost] = el.split(" ").map((el2) => +el2);
  if (dp[from - 1][to - 1] === Infinity) dp[from - 1][to - 1] = cost;
  else dp[from - 1][to - 1] = Math.min(dp[from - 1][to - 1], cost);
});

const floyd = () => {
  for (let k = 0; k < N; k++) {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (y !== x) {
          if (k !== x) {
            dp[y][x] = Math.min(dp[y][x], dp[y][k] + dp[k][x]);
          }
        }
      }
    }
  }
};

floyd();

console.log(
  dp
    .map((el) => el.map((el2) => (el2 === Infinity ? 0 : el2)).join(" "))
    .join("\n")
);
