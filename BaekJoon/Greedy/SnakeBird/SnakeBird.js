const fs = require("fs");
let [[N, M], arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map((el2) => +el2));

let sorted = arr.sort((a, b) => a - b);
let index = 0;

for (let i = 0; i < sorted.length; i++) {
  if (sorted[i] > M) break;
  else if (sorted[i] <= M) M++;
}

console.log(M);
