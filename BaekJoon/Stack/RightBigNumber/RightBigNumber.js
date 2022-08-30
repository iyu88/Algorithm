const fs = require("fs");
let [num, arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = Array(N).fill(-1);
arr = arr.split(" ").map(Number);
let stack = [];

for (let i = 0; i < N; i++) {
  while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
    answer[stack.pop()] = arr[i];
  }
  stack.push([i]);
}

console.log(answer.join(" "));
