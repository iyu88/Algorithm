const fs = require("fs");
let [people, nums, N, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let P = +people;
let answer = -1;
let visited = Array(P).fill(0);
let [F, T] = nums.split(" ").map((el) => el - 1);
let points = Array.from(Array(P), () => []);
arr.forEach((el) => {
  let [from, to] = el.split(" ").map((el2) => +el2);
  points[from - 1].push(to - 1);
  points[to - 1].push(from - 1);
});

const bfs = () => {
  let q = [];
  q.push([F, 0]);
  while (q.length) {
    let [start, dist] = q.shift();
    if (start === T) {
      answer = dist;
      break;
    }
    if (!visited[start]) {
      visited[start] = dist;
      for (const el of points[start]) {
        if (!visited[el]) {
          q.push([el, dist + 1]);
        }
      }
    }
  }
};

bfs();

console.log(answer);
