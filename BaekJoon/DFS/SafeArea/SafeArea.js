const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = [];
let visited;
let count;
let $map = arr.map((el) => el.split(" ").map((el2) => +el2));
let dy = [-1, 0, 1, 0];
let dx = [0, -1, 0, 1];
let max = 0;
let min = Infinity;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    max = Math.max(max, $map[y][x]);
    min = Math.min(min, $map[y][x]);
  }
}

const dfs = (y, x, v) => {
  if (!visited[y][x]) {
    visited[y][x] = true;
    for (let k = 0; k < dy.length; k++) {
      let dyy = dy[k] + y;
      let dxx = dx[k] + x;
      if (dyy > -1 && dxx > -1 && dyy < N && dxx < N) {
        if (!visited[dyy][dxx] && $map[dyy][dxx] > v) {
          dfs(dyy, dxx, v);
        }
      }
    }
  }
};

for (let v = min; v < max; v++) {
  visited = Array(N)
    .fill(null)
    .map((el) => Array(N).fill(false));
  count = 0;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (!visited[y][x] && $map[y][x] > v) {
        dfs(y, x, v);
        count++;
      }
    }
  }
  answer.push(count);
}

console.log(answer.length ? Math.max(...answer) : min);
