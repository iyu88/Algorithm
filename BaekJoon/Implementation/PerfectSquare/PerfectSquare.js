const fs = require("fs");
let [N, M] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

let answer = [];
for (let i = Math.ceil(Math.sqrt(N)); i <= Math.floor(Math.sqrt(M)); i++) {
  answer.push(i ** 2);
}

if (answer.length) {
  console.log(answer.reduce((acc, cur) => acc + cur, 0));
  console.log(answer[0]);
} else console.log(-1);
