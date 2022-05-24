const fs = require("fs");
let [A, B, C] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => +el);
let answer = Math.sqrt(A ** 2 / (B ** 2 + C ** 2));
console.log(Math.floor(B * answer) + " " + Math.floor(C * answer));
