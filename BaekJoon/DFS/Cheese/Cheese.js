const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map((el) => +el);
let answer = 0;
let visited;
let $map = arr.map((el) => el.split(" ").map((el2) => +el2));
let flag = $map.some((el) => el.some((el2) => el2 === 1));
let dy = [-1, 0, 1, 0];
let dx = [0, -1, 0, 1];

const dfs = (y, x) => {
  if (!visited[y][x]) {
    visited[y][x] = true;
    $map[y][x] = 2;
    for (let k = 0; k < 4; k++) {
      let dyy = dy[k] + y;
      let dxx = dx[k] + x;
      if (dyy > -1 && dxx > -1 && dyy < N && dxx < M) {
        if (!visited[dyy][dxx] && $map[dyy][dxx] !== 1) dfs(dyy, dxx);
      }
    }
  }
};

const melted = () => {
  let temp = $map.map((el) => el.slice(0));
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if ($map[y][x] === 1) {
        let count = 0;
        for (let k = 0; k < 4; k++) {
          let dyy = dy[k] + y;
          let dxx = dx[k] + x;
          if (
            dyy > -1 &&
            dxx > -1 &&
            dyy < N &&
            dxx < M &&
            $map[dyy][dxx] === 2
          ) {
            count++;
            if (count === 2) {
              temp[y][x]--;
              break;
            }
          }
        }
      }
    }
  }
  $map = temp.map((el) => el.slice(0));
};

while (flag) {
  visited = Array(N)
    .fill(null)
    .map((el) => Array(M).fill(false));
  dfs(0, 0);
  melted();
  answer++;
  flag = $map.some((el) => el.some((el2) => el2 === 1));
}

console.log(answer);
