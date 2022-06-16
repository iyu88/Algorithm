const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, M] = num.split(" ").map(Number);
arr = arr.map((el) => el.split(" ").map(Number));
let visited = Array(N)
  .fill(null)
  .map((el) => Array(M).fill(-1));
let dy = [-1, 1, 0, 0];
let dx = [0, 0, -1, 1];

const dfs = (y, x) => {
  if (y === N - 1 && x === M - 1) return 1;
  else if (visited[y][x] === -1) {
    visited[y][x] = 0;
    for (let k = 0; k < 4; k++) {
      let dyy = dy[k] + y;
      let dxx = dx[k] + x;
      if (
        dyy > -1 &&
        dyy < N &&
        dxx > -1 &&
        dxx < M &&
        arr[dyy][dxx] < arr[y][x]
      ) {
        visited[y][x] += dfs(dyy, dxx);
      }
    }
  }
  return visited[y][x];
};

dfs(0, 0);

console.log(visited[0][0]);
