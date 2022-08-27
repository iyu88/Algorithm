const fs = require("fs");
let [num, arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
arr = arr
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let result = Infinity;
let answer = [];

for (let i = 0; i < N - 2; i++) {
  let start = i + 1;
  let end = N - 1;
  while (start < end) {
    let sum = arr[start] + arr[end] + arr[i];
    if (Math.abs(sum) < result) {
      result = Math.abs(sum);
      answer = [arr[i], arr[start], arr[end]];
    }
    if (sum < 0) start++;
    else end--;
  }
}

console.log(answer.sort((a, b) => a - b).join(" "));
