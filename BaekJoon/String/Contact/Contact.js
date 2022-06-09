const fs = require("fs");
let [num, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let re = new RegExp("^(100+1+|01)+$");
let N = +num;
let answer = [];

for (let i = 0; i < N; i++) {
  if (inputs[i].match(re)) answer.push("YES");
  else answer.push("NO");
}

console.log(answer.join("\n"));
