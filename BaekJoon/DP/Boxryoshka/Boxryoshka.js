const fs = require("fs");
let [num, arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map((el2) => +el2));

let N = num[0];
let answer = Array(N).fill(1);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[j] < arr[i]) answer[i] = Math.max(answer[i], answer[j] + 1);
  }
}

console.log(Math.max(...answer));
