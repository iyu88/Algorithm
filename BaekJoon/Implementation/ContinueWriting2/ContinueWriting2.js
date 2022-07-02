const fs = require("fs");
let [n, k] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let answer = 0;
let num = 1;
let nine = 9;

while (k > num * nine) {
  k -= num * nine;
  answer += nine;

  num++;
  nine *= 10;
}

answer = answer + 1 + Math.floor((k - 1) / num);

if (answer > n) console.log(-1);
else console.log(answer.toString()[(k - 1) % num]);
