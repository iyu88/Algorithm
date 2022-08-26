const fs = require("fs");
const [nums, arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

let answer = Infinity;
let [N, S] = nums;
let sum = 0;
let start = 0;
let end = 0;

for (start; start < N; start++) {
  while (sum < S && end < N) {
    sum += arr[end++];
  }
  if (sum >= S) answer = Math.min(answer, end - start);
  sum -= arr[start];
}

console.log(answer === Infinity ? 0 : answer);
