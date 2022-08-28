const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = 0;
let parent = {};
let points = [];
arr = arr.map((el) => el.split(" ").map(Number));

for (let i = 1; i <= N; i++) {
  parent[i] = i;
}

const findParent = (obj, t) => {
  if (obj[t] !== t) obj[t] = findParent(obj, obj[t]);
  return obj[t];
};

const unionFind = (obj, a, b) => {
  a = findParent(obj, a);
  b = findParent(obj, b);
  if (a < b) obj[b] = a;
  else obj[a] = b;
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    points.push([i, j, arr[i][j]]);
  }
}

points
  .sort((a, b) => a[2] - b[2])
  .forEach((el) => {
    let [y, x, weight] = el;
    if (findParent(parent, y) !== findParent(parent, x)) {
      unionFind(parent, y, x);
      answer += weight;
    }
  });

console.log(answer);
