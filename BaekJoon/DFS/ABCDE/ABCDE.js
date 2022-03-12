const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map((el) => +el);
let answer = false;
let visited = Array(N).fill(false);
let points = Array(N)
  .fill(null)
  .map((el) => []);
arr.forEach((el) => {
  let [from, to] = el.split(" ").map((el) => +el);
  points[from].push(to);
  points[to].push(from);
});

const dfs = (i, count) => {
  if (count === 5) {
    answer = true;
    return;
  }
  if (!visited[i]) {
    visited[i] = true;
    for (const el of points[i]) {
      if (!visited[el]) {
        dfs(el, count + 1);
      }
    }
    visited[i] = false;
  }
};

for (let i = 0; i < N; i++) {
  if (!visited[i]) {
    let count = 1;
    dfs(i, count);
    if (answer) break;
  }
}

console.log(answer ? 1 : 0);
