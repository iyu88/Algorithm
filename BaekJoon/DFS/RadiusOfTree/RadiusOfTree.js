const fs = require("fs");
let [v, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let V = +v;
let answer = [0, 0];
let points = Array.from(Array(V), () => []);
arr.forEach((el) => {
  let [from, ...dists] = el.split(" ").map((el2) => +el2);
  while (dists[0] !== -1) {
    let [to, weight] = dists.splice(0, 2);
    points[from - 1].push({ v: to - 1, w: weight });
  }
});

const dfs = (i, dist, visited) => {
  if (dist > answer[0]) {
    answer[0] = dist;
    answer[1] = i;
  }
  if (!visited[i]) {
    visited[i] = true;
    if (points[i].length) {
      for (const el of points[i]) {
        if (!visited[el.v]) {
          dfs(el.v, dist + el.w, visited);
        }
      }
    }
  }
};

let visited = Array(V).fill(false);
dfs(1, 0, visited);
visited = Array(V).fill(false);
dfs(answer[1], 0, visited);

console.log(answer[0]);
