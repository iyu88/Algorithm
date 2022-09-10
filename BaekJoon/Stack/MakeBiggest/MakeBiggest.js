const fs = require("fs");
let [nums, str] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, M] = nums.split(" ").map(Number);
let stack = str.split("").map(Number);
let answer = [];

for (let i = 0; i < N; i++) {
  let a = stack[i];
  if (!answer.length) answer.push(a);
  else {
    while (M && a > answer[answer.length - 1]) {
      answer.pop();
      M--;
    }
    answer.push(a);
  }
}

while (M--) {
  answer.pop();
}

console.log(answer.join(""));
