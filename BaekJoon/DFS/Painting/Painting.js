const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map(Number);
let temp;
let width = 0;
let count = 0;
arr = arr.map((el) => el.split(" ").map(Number));
let visited = Array(N)
  .fill(null)
  .map((el) => Array(M).fill(false));
let dy = [-1, 1, 0, 0];
let dx = [0, 0, -1, 1];

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
        arr[dyy][dxx]
      ) {
        temp++;
        dfs(dyy, dxx);
      }
    }
  }
};

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (!visited[y][x] && arr[y][x]) {
      temp = 1;
      dfs(y, x);
      width = Math.max(width, temp);
      count++;
    }
  }
}

console.log(count);
console.log(width);
