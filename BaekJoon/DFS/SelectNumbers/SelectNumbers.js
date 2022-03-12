const fs = require("fs");
let arr = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => +el - 1);

let N = arr.shift() + 1;
let answer = [];
let visited = Array(N).fill(0);

for (let i = 0; i < N; i++) {
  if (arr[i] === i) {
    answer.push(i + 1);
    visited[i] = 2;
  }
}

const dfs = (i) => {
  if (visited[i] < 2) {
    visited[i]++;
    if (visited[i] === 2) answer.push(i + 1);
    if (visited[arr[i]] < 2) dfs(arr[i]);
  }
};

for (let i = 0; i < N; i++) {
  if (!visited[i]) {
    dfs(i);
    visited = visited.map((el) => (el === 1 ? 0 : el));
  }
}

console.log(answer.length);
console.log(answer.sort((a, b) => a - b).join("\n"));
