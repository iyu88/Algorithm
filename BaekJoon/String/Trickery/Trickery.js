const fs = require("fs");
let arr = fs.readFileSync("/dev/stdin").toString().trim().split("");

let answer = [1, 0, 0];
let swap = (i, j) => ([answer[i], answer[j]] = [answer[j], answer[i]]);
arr.forEach((el) => {
  if (el === "A") swap(0, 1);
  else if (el === "B") swap(1, 2);
  else if (el === "C") swap(0, 2);
});
console.log(answer.findIndex((el) => el === 1) + 1);
