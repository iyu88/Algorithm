const fs = require("fs");
let [num, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

let answer = 0;

for (let i = num - 1; i > -1; i--) {
  if (arr[i] <= arr[i - 1]) {
    answer += arr[i - 1] - arr[i] + 1;
    arr[i - 1] = arr[i] - 1;
  }
}

console.log(answer);
