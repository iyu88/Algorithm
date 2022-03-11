const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [M, N, K] = nums.split(" ").map((el) => +el);
let answer = [];
let visited = Array(M)
  .fill(null)
  .map((el) => Array(N).fill(false));
let $map = Array(M)
  .fill(null)
  .map((el) => Array(N).fill(0));
let dy = [-1, 0, 1, 0];
let dx = [0, -1, 0, 1];
let count;

while (arr.length) {
  let [x1, y1, x2, y2] = arr
    .shift()
    .split(" ")
    .map((el) => +el);
  for (let i = Math.min(y1, y2); i < Math.max(y1, y2); i++) {
    for (let j = Math.min(x1, x2); j < Math.max(x1, x2); j++) {
      if (!$map[i][j]) $map[i][j]++;
    }
  }
}

const dfs = (y, x) => {
  if (!visited[y][x]) {
    visited[y][x] = true;
    for (let k = 0; k < dy.length; k++) {
      let dyy = dy[k] + y;
      let dxx = dx[k] + x;
      if (dyy > -1 && dxx > -1 && dyy < M && dxx < N) {
        if (!visited[dyy][dxx] && !$map[dyy][dxx]) {
          count++;
          dfs(dyy, dxx);
        }
      }
    }
  }
};

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j] && !$map[i][j]) {
      count = 1;
      dfs(i, j);
      answer.push(count);
    }
  }
}

console.log(answer.length);
console.log(answer.sort((a, b) => a - b).join(" "));
