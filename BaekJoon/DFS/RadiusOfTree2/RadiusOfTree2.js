const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = [0, 0];
let visited = Array.from(Array(2), () => Array(N).fill(false));
let points = Array.from(Array(N), () => []);
arr.forEach((el) => {
  let [parent, child, weight] = el.split(" ").map((el2) => +el2);
  points[parent - 1].push({ v: child - 1, w: weight });
  points[child - 1].push({ v: parent - 1, w: weight });
});

const dfs = (vertex, dist, visitedIndex) => {
  if (dist > answer[1]) {
    answer[0] = vertex;
    answer[1] = dist;
  }
  if (!visited[visitedIndex][vertex]) {
    visited[visitedIndex][vertex] = true;
    if (!points[vertex].length) return;
    for (const el of points[vertex]) {
      if (!visited[visitedIndex][el.v]) {
        dfs(el.v, dist + el.w, visitedIndex);
      }
    }
  }
};

dfs(0, 0, 0);
dfs(answer[0], 0, 1);

console.log(answer[1]);
