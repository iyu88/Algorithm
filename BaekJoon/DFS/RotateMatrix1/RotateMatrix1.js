const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M, R] = nums.split(" ").map(Number);
let dy = [1, 0, -1, 0];
let dx = [0, 1, 0, -1];
arr = arr.map((el) => el.split(" ").map(Number));

const dfs = (y, x, v, d, s) => {
  let cur = arr[y][x];
  arr[y][x] = v;
  let dyy = dy[d] + y;
  let dxx = dx[d] + x;
  if (d === 3 && dyy === s && dxx === s) return;
  if (
    dyy > s - 1 &&
    dyy < N - s &&
    dxx > s - 1 &&
    dxx < M - s &&
    !(dyy === s && dxx === s)
  ) {
    dfs(dyy, dxx, cur, d, s);
  } else if (d + 1 < 4) {
    dyy = dy[d + 1] + y;
    dxx = dx[d + 1] + x;
    if (d === 3 && dyy === s && dxx === s) return;
    dfs(dyy, dxx, cur, d + 1, s);
  }
};

while (R--) {
  let end = Math.ceil(Math.min(N, M) / 2);
  for (let i = 0; i < end; i++) {
    dfs(i, i, arr[i][i + 1], 0, i);
  }
}

console.log(arr.map((el) => el.join(" ")).join("\n"));
