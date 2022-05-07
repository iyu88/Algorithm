const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let answer = 0;
let [N, M] = nums.split(" ").map((el) => +el);
let visited = Array(N)
  .fill(null)
  .map((el) => Array(M).fill(false));
let $map = arr.map((el) => el.split(" ").map((el2) => +el2));
let dy = [-1, 0, 1, 0, 1, 1, -1, -1];
let dx = [0, -1, 0, 1, 1, -1, 1, -1];

const dfs = (i, j) => {
  if (!visited[i][j]) {
    visited[i][j] = true;
    for (let k = 0; k < 8; k++) {
      let dyy = dy[k] + i;
      let dxx = dx[k] + j;
      if (
        dyy > -1 &&
        dyy < N &&
        dxx > -1 &&
        dxx < M &&
        !visited[dyy][dxx] &&
        $map[dyy][dxx]
      )
        dfs(dyy, dxx);
    }
  }
};

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (!visited[y][x] && $map[y][x]) {
      dfs(y, x);
      answer++;
    }
  }
}

console.log(answer);
