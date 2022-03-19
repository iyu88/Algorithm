const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map((el) => +el);
let answer = 0;
let flag;
let visited = Array(N)
  .fill(null)
  .map((el) => Array(M).fill(false));
let $map = arr.map((el) => el.split(" ").map((el2) => +el2));
let min = Math.min(...$map.map((el) => Math.min(...el)));
let dy = [-1, 0, 1, 0, -1, -1, 1, 1];
let dx = [0, -1, 0, 1, 1, -1, 1, -1];

const dfs = (y, x, v) => {
  if (!visited[y][x]) {
    visited[y][x] = true;
    for (let k = 0; k < 8; k++) {
      let dyy = dy[k] + y;
      let dxx = dx[k] + x;
      if (dyy > -1 && dxx > -1 && dyy < N && dxx < M) {
        if ($map[dyy][dxx] > v) {
          // 방문 상관 없이 값이 크면 거짓
          flag = false;
        } else if (!visited[dyy][dxx] && $map[dyy][dxx] === v) {
          // 방문 않고 값이 같으면 탐색
          dfs(dyy, dxx, $map[dyy][dxx]);
        }
      }
    }
  }
};

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (!visited[y][x] && $map[y][x] !== min) {
      flag = true;
      dfs(y, x, $map[y][x]);
      if (flag) answer++;
    }
  }
}

console.log(answer);
