const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M, K] = nums.split(" ").map((el) => +el);
let answer = 0;
let result;
let visited = Array(N)
  .fill(null)
  .map((el) => Array(M).fill(false));
let $map = Array(N)
  .fill(null)
  .map((el) => Array(M).fill(0));
arr.forEach((el) => {
  let [y, x] = el.split(" ").map((el2) => +el2 - 1);
  $map[y][x]++;
});
let dy = [-1, 0, 1, 0];
let dx = [0, -1, 0, 1];

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
        $map[dyy][dxx]
      ) {
        result++;
        dfs(dyy, dxx);
      }
    }
  }
};

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    result = 1;
    if (!visited[y][x] && $map[y][x]) dfs(y, x);
    answer = Math.max(answer, result);
  }
}

console.log(answer);
