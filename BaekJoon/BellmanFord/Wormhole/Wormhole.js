const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

while (arr.length) {
  let [N, M, W] = arr
    .shift()
    .split(" ")
    .map((el) => +el);
  let info = arr.splice(0, M + W).map((el) => el.split(" ").map((el2) => +el2));
  let points = [];
  let visited = Array(N).fill(0);
  let isBack = false;
  info.forEach((el, i) => {
    let [from, to, weight] = el;
    if (i < M) {
      points.push([from - 1, to - 1, weight]);
      points.push([to - 1, from - 1, weight]);
    } else {
      points.push([from - 1, to - 1, -weight]);
    }
  });

  visited[1] = 0;
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

  console.log(isBack ? "YES" : "NO");
}
