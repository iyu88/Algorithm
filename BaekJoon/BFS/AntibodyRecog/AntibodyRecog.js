const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map((el) => +el);
let answer = true;
let visited = Array.from(Array(N), () => Array(M).fill(false));
let before = arr.splice(0, N).map((el) => el.split(" ").map((el2) => +el2));
let after = arr.splice(0, N).map((el) => el.split(" ").map((el2) => +el2));

let dy = [-1, 0, 1, 0];
let dx = [0, -1, 0, 1];

const bfs = (y, x, valueB, valueA) => {
  let q = [];
  q.push([y, x]);
  while (q.length) {
    let [nextY, nextX] = q.shift();
    visited[nextY][nextX] = true;
    before[nextY][nextX] = valueA;
    for (let k = 0; k < dy.length; k++) {
      let dyy = dy[k] + nextY;
      let dxx = dx[k] + nextX;
      if (dyy > -1 && dxx > -1 && dyy < N && dxx < M) {
        if (!visited[dyy][dxx] && before[dyy][dxx] === valueB) {
          q.push([dyy, dxx]);
        }
      }
    }
  }
};

let flag = true;
for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (before[y][x] !== after[y][x]) {
      bfs(y, x, before[y][x], after[y][x]);
      flag = false;
      if (!flag) break;
    }
  }
  if (!flag) break;
}

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (before[y][x] !== after[y][x]) {
      answer = false;
      if (!answer) break;
    }
  }
  if (!answer) break;
}

console.log(answer ? "YES" : "NO");
