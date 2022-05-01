const fs = require("fs");
let [[N, M], arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map((el2) => +el2));

let sub = Array(N - 1).fill(null);
for (let i = 1; i < N; i++) {
  sub[i - 1] = arr[i] - arr[i - 1];
}
console.log(
  sub
    .sort((a, b) => b - a)
    .splice(M - 1)
    .reduce((acc, cur) => acc + cur, 0)
);
