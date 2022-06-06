const fs = require("fs");
let [t, num, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let N = +num;
let answer = 0;

arr.forEach((el) => {
  if ((el + el).toString().includes(t)) answer++;
});

console.log(answer);
