const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map(Number);
let answer = false;
let visited = Array(N)
  .fill(null)
  .map((el) => Array(M).fill(false));
arr = arr.map((el) => el.split("").map(Number));
let dy = [-1, 0, 0, 1];
let dx = [0, -1, 1, 0];

const dfs = (y, x) => {
  if (!visited[y][x]) {
    visited[y][x] = true;
    for (let k = 0; k < 4; k++) {
      let dyy = dy[k] + y;
      let dxx = dx[k] + x;
      if (
        dyy > -1 &&
        dyy < N &&
        dxx > -1 &&
        dxx < M &&
        !visited[dyy][dxx] &&
        !arr[dyy][dxx]
      ) {
        dfs(dyy, dxx);
      }
    }
  }
};

for (let x = 0; x < M; x++) {
  if (!visited[0][x]) {
    dfs(0, x);
  }
}

for (let x = 0; x < M; x++) {
  if (visited[N - 1][x]) {
    answer = true;
    break;
  }
}

console.log(answer ? "YES" : "NO");
