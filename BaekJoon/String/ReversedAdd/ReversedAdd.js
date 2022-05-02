const fs = require("fs");
let [N, M] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => el.split(""));
let answer = Number(N.reverse().join("")) + Number(M.reverse().join(""));
console.log(Number(answer.toString().split("").reverse().join("")));
