const fs = require("fs");
let [N, M] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let answer = (M * (M + 1)) / 2;
if (answer > N) {
  console.log(-1);
} else {
  N -= answer;
  if (N % M === 0) console.log(M - 1);
  else console.log(M);
}
