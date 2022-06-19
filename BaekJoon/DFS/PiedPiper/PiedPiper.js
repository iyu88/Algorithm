const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map(Number);
let answer = 0;
let visited = Array(N)
  .fill(null)
  .map((el) => Array(M).fill(false));
let finished = Array(N)
  .fill(null)
  .map((el) => Array(M).fill(false));
arr = arr.map((el) => el.split(""));
let dy = [-1, 1, 0, 0];
let dx = [0, 0, -1, 1];

const dfs = (y, x) => {
  if (!visited[y][x]) {
    visited[y][x] = true;
    let k;
    if (arr[y][x] === "U") k = 0;
    if (arr[y][x] === "D") k = 1;
    if (arr[y][x] === "L") k = 2;
    if (arr[y][x] === "R") k = 3;
    let dyy = dy[k] + y;
    let dxx = dx[k] + x;
    if (dyy > -1 && dyy < N && dxx > -1 && dxx < M) {
      if (!visited[dyy][dxx]) dfs(dyy, dxx);
      else if (!finished[dyy][dxx]) answer++;
    }
    finished[y][x] = true;
  }
};

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (!visited[y][x]) dfs(y, x);
  }
}

console.log(answer);
