const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = [];
let points = Array.from(Array(N), () => []);
arr.forEach((el) => {
  let [from, to] = el.split(" ").map((el2) => +el2);
  points[from - 1].push(to - 1);
  points[to - 1].push(from - 1);
});

const bfs = () => {
  let visited = Array(N).fill(false);
  visited[0] = true;
  let q = [0];
  while (q.length) {
    let next = q.shift();
    for (const el of points[next]) {
      if (!visited[el]) {
        visited[el] = true;
        answer[el - 1] = next + 1;
        q.push(el);
      }
    }
  }
};

bfs();

console.log(answer.join("\n"));
