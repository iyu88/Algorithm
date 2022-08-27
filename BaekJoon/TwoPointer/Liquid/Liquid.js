const fs = require("fs");
let [num, arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let result = Infinity;
let answer = [];
arr = arr.split(" ").map(Number);

let start = 0;
let end = N - 1;

while (start < end) {
  let sum = arr[start] + arr[end];
  if (Math.abs(sum) < result) {
    result = Math.abs(sum);
    answer = [arr[start], arr[end]];
  }
  if (sum < 0) start++;
  else end--;
}

console.log(answer.join(" "));
