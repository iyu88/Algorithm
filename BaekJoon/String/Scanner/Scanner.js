const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [R, C, ZR, ZC] = nums.split(" ").map(Number);
let answer = Array(R * ZR)
  .fill(null)
  .map((el) => Array(C * ZC).fill(null));

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    for (let m = i * ZR; m < (i + 1) * ZR; m++) {
      for (let n = j * ZC; n < (j + 1) * ZC; n++) {
        answer[m][n] = arr[i][j];
      }
    }
  }
}

console.log(answer.map((el) => el.join("")).join("\n"));
