const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = [0, 0];
let visited = Array.from(Array(N), () => Array(N).fill(false));
let visited2 = Array.from(Array(N), () => Array(N).fill(false));
let $map = arr.map((el) => el.split(""));

let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

const dfs = (y, x, v) => {
  if (!visited[y][x]) {
    visited[y][x] = true;
    for (let k = 0; k < dy.length; k++) {
      let dyy = dy[k] + y;
      let dxx = dx[k] + x;
      if (
        dyy > -1 &&
        dyy < N &&
        dxx > -1 &&
        dxx < N &&
        $map[dyy][dxx] === v &&
        !visited[dyy][dxx]
      ) {
        dfs(dyy, dxx, v);
      }
    }
  }
};

const dfs2 = (y, x, v) => {
  if (!visited2[y][x]) {
    visited2[y][x] = true;
    for (let k = 0; k < dy.length; k++) {
      let dyy = dy[k] + y;
      let dxx = dx[k] + x;
      if (dyy > -1 && dyy < N && dxx > -1 && dxx < N && !visited2[dyy][dxx]) {
        if (v && $map[dyy][dxx] === "B") {
          dfs2(dyy, dxx, true);
        } else if (!v && $map[dyy][dxx] !== "B") {
          dfs2(dyy, dxx, false);
        }
      }
    }
  }
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j]) {
      dfs(i, j, $map[i][j]);
      answer[0]++;
    }
    if (!visited2[i][j]) {
      dfs2(i, j, $map[i][j] === "B" ? true : false);
      answer[1]++;
    }
  }
}

console.log(answer.join(" "));
