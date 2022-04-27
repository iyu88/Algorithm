const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map((el) => +el);
arr = arr.map((el) => el.split("").map((el) => +el));
let target = arr.splice(0, N);
let count = 0;
let flag = true;

for (let i = 0; i < N - 2; i++) {
  for (let j = 0; j < M - 2; j++) {
    if (arr[i][j] !== target[i][j]) {
      for (let k = i; k < i + 3; k++) {
        for (let l = j; l < j + 3; l++) {
          if (target[k][l]) target[k][l] = 0;
          else target[k][l] = 1;
        }
      }
      count++;
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (arr[i][j] !== target[i][j]) {
      flag = false;
      break;
    }
  }
  if (!flag) break;
}

console.log(flag ? count : -1);
