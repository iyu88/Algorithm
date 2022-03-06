const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map((el) => +el);
let visited = Array(N).fill(Infinity);
let points = [];
let isBack = false;
arr.forEach((el) => {
  let [from, to, weight] = el.split(" ").map((el2) => +el2);
  points.push([from - 1, to - 1, weight]);
});

const bellman = () => {
  visited[0] = 0;
  for (let i = 0; i < N - 1; i++) {
    for (let j = 0; j < points.length; j++) {
      let [from, to, weight] = points[j];
      if (visited[from] === Infinity) continue;
      if (visited[to] > visited[from] + weight)
        visited[to] = visited[from] + weight;
    }
  }

  for (let j = 0; j < points.length; j++) {
    let [from, to, weight] = points[j];
    if (visited[from] === Infinity) continue;
    if (visited[to] > visited[from] + weight) {
      isBack = true;
      break;
    }
  }

  if (isBack) {
    console.log(-1);
  } else {
    let answer = [];
    for (let k = 1; k < visited.length; k++) {
      if (visited[k] === Infinity) answer.push(-1);
      else answer.push(visited[k]);
    }
    console.log(answer.join("\n"));
  }
};

bellman();
