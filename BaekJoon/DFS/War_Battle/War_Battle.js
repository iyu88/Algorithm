const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [M, N] = nums.split(" ").map(Number);
let answer = [0, 0];
let power;
let visited = Array(N)
  .fill(null)
  .map((el) => Array(M).fill(false));
let dy = [-1, 0, 1, 0];
let dx = [0, -1, 0, 1];
arr = arr.map((el) => el.split(""));

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
        arr[dyy][dxx] === arr[y][x]
      ) {
        power++;
        dfs(dyy, dxx);
      }
    }
  }
};

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (!visited[y][x]) {
      power = 1;
      dfs(y, x);
      if (arr[y][x] === "W") answer[0] += power ** 2;
      else answer[1] += power ** 2;
    }
  }
}

console.log(answer.join(" "));
