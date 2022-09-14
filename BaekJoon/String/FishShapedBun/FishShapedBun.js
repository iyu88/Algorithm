const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map(Number);
let answer = Array(N)
  .fill(null)
  .map((el) => Array(M).fill(null));

for (let i = 0; i < N; i++) {
  for (let j = M - 1; j > -1; j--) {
    answer[i][j] = arr[i][M - j - 1];
  }
}

console.log(answer.map((el) => el.join("")).join("\n"));
