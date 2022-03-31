const fs = require("fs");
let answer = Array(26).fill(0);
let str = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("")
  .forEach((el) => (answer[el.charCodeAt() - 97] += 1));
console.log(answer.join(" "));
