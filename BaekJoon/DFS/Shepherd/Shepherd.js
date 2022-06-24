const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map(Number);
let answer = Array(2).fill(0);
let counts;
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
      if (dyy > -1 && dyy < N && dxx > -1 && dxx < M && !visited[dyy][dxx]) {
        if (arr[dyy][dxx] !== "#") {
          if (arr[dyy][dxx] === "k") counts[0]++;
          else if (arr[dyy][dxx] === "v") counts[1]++;
          dfs(dyy, dxx);
        }
      }
    }
  }
};

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (!visited[y][x] && arr[y][x] !== "#") {
      counts = Array(2).fill(0);
      if (arr[y][x] === "k") counts[0] = 1;
      else if (arr[y][x] === "v") counts[1] = 1;
      dfs(y, x);
      if (counts[0] > counts[1]) answer[0] += counts[0];
      else answer[1] += counts[1];
    }
  }
}

console.log(answer.join(" "));
