const fs = require("fs");
let [nums, arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

let answer = 0;
let [N, M] = nums;
let start = 0;
let end = 0;

while (start <= end && end <= N) {
  let sum = arr.slice(start, end).reduce((acc, cur) => acc + cur, 0);
  if (sum < M) end++;
  else {
    if (sum === M) answer++;
    start++;
  }
}

console.log(answer);
