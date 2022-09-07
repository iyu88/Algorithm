const fs = require("fs");
let [a, b] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => el.split("").map(Number));

let answer = 0;
for (let i = 0; i < a.length; i++) {
  for (let j = 0; j < b.length; j++) {
    answer += a[i] * b[j];
  }
}

console.log(answer);
