const fs = require("fs");
let [num, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

let answer = 0;
arr
  .sort((a, b) => b - a)
  .forEach((el, i) => {
    if (el - i > 0) answer += el - i;
  });

console.log(answer);
