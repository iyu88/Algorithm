const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = [];
let visited = Array(N).fill(false);
let points = Array.from(Array(N), () => []);
arr.forEach((el) => {
  let [from, to] = el.split(" ").map((el2) => +el2);
  points[from - 1].push(to - 1);
  points[to - 1].push(from - 1);
});

const dfs = (from) => {
  for (const el of points[from]) {
    if (!visited[el]) {
      visited[el] = true;
      answer[el - 1] = from + 1;
      dfs(el);
    }
  }
};

dfs(0);

console.log(answer.join("\n"));
