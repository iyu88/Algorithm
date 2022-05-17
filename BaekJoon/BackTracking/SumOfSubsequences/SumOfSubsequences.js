const fs = require("fs");
let [nums, arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map((el2) => +el2));

let [N, M] = nums;
let answer = 0;
let visited = Array(N).fill(false);

const backTracking = (i, next) => {
  if (
    visited.some((el) => el !== false) &&
    visited.reduce((acc, cur) => acc + cur, 0) === M
  )
    answer++;
  if (visited.some((el) => el === false)) {
    for (let j = next; j < N; j++) {
      if (visited[i]) continue;
      visited[i] = arr[j];
      let isDiff = true;
      for (let k = 0; k < i; k++) {
        if (visited[k] === visited[i] && k === j) {
          isDiff = false;
          break;
        }
      }
      if (isDiff) backTracking(i + 1, j + 1);
      visited[i] = false;
    }
  }
};

backTracking(0, 0);

console.log(answer);
