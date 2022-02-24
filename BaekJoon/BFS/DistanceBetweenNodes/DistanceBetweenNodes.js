const fs = require("fs");
let [nums, ...temp] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map((el) => +el);
let answer = [];
let visited;
let points = Array.from(Array(N), () => []);
let arr = temp.splice(0, N - 1);
arr.forEach((el) => {
  let [from, to, dist] = el.split(" ").map((el2) => +el2);
  points[from - 1].push([to - 1, dist]);
  points[to - 1].push([from - 1, dist]);
});
let nodes = temp.splice(0, M);

const bfs = (from, to) => {
  visited = Array(N).fill(false);
  let q = [];
  q.push([from, 0]);
  visited[from] = true;
  while (q.length) {
    let [nextV, nextD] = q.shift();
    if (nextV === to) {
      answer.push(nextD);
      break;
    }
    for (const el of points[nextV]) {
      let [$to, $d] = el;
      if (!visited[$to]) {
        visited[$to] = true;
        q.push([$to, nextD + $d]);
      }
    }
  }
};

for (let i = 0; i < nodes.length; i++) {
  let [from, to] = nodes[i].split(" ").map((el) => +el);
  bfs(from - 1, to - 1);
}

console.log(answer.join("\n"));
