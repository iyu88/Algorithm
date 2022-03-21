const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map((el) => +el);
let answer = 0;
let flag = 1;
let visited;
let $map = arr.map((el) => el.split(" ").map((el2) => +el2));
let dy = [-1, 0, 1, 0];
let dx = [0, -1, 0, 1];

const dfs = (y, x) => {
  if (!visited[y][x]) {
    visited[y][x] = true;
    for (let k = 0; k < 4; k++) {
      let dyy = dy[k] + y;
      let dxx = dx[k] + x;
      if (dyy > -1 && dxx > -1 && dyy < N && dxx < M) {
        if (!visited[dyy][dxx] && $map[dyy][dxx]) {
          dfs(dyy, dxx);
        }
      }
    }
  }
};

const meltIceberg = () => {
  let temp = $map.map((el) => el.slice(0));
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if ($map[y][x]) {
        for (let k = 0; k < 4; k++) {
          let dyy = dy[k] + y;
          let dxx = dx[k] + x;
          if (dyy > -1 && dxx > -1 && dyy < N && dxx < M && !$map[dyy][dxx]) {
            if (!temp[y][x]) break;
            else temp[y][x]--;
          }
        }
      }
    }
  }
  $map = temp.map((el) => el.slice(0));
};

while (flag === 1) {
  answer++;
  flag = 0;
  visited = Array(N)
    .fill(null)
    .map((el) => Array(M).fill(false));
  meltIceberg();
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (!visited[y][x] && $map[y][x]) {
        dfs(y, x);
        flag++;
        if (flag === 2) break;
      }
    }
    if (flag === 2) break;
  }
  if ($map.every((el) => el.every((el2) => el2 === 0))) {
    answer = 0;
    break;
  }
}

console.log(answer);
