const fs = require("fs");
let arr = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(""));

let N = Math.max(...arr.map((el) => el.length));
let answer = "";

for (let i = 0; i < N; i++) {
  for (let j = 0; j < arr.length; j++) {
    if (arr[j][i] !== undefined) answer += arr[j][i];
  }
}

console.log(answer);
