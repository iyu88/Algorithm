const fs = require("fs");
let [n, m, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let N = +n;
let M = +m;
let points = Array(N)
  .fill(null)
  .map((el) => []);
let visited = Array(N).fill(false);

arr.forEach((el) => {
  let [from, to] = el.split(" ").map((el2) => el2 - 1);
  points[from].push(to);
  points[to].push(from);
});

const dfs = (x) => {
  let [next, relation] = x;
  if (relation === 2) {
    return;
  }
  for (const el of points[next]) {
    visited[el] = true;
    dfs([el, relation + 1]);
  }
};

dfs([0, 0]);
console.log(visited.slice(1).filter((el) => el === true).length);
