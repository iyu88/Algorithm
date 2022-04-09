const fs = require("fs");
let [[N, M], ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map((el2) => +el2));

let answer = [];
let visited = Array(N).fill(0);
let points = Array(N)
  .fill(null)
  .map((el) => []);
arr.forEach((el) => {
  points[el[0] - 1].push(el[1] - 1);
  visited[el[1] - 1]++;
});

let q = [];
for (let i = 0; i < N; i++) {
  if (!visited[i]) q.push(i); // 값이 0 (진입차수)
}

while (q.length) {
  const next = q.pop();
  answer.push(next + 1);
  for (const el of points[next]) {
    visited[el]--;
    if (!visited[el]) q.push(el); // 또 진입차수가 0일 때
  }
}

console.log(answer.join(" "));
