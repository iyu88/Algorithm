const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = 0;
let parent = {};
let points = [];
let X, Y;

const calcWeight = (x, y) =>
  Math.sqrt(
    (Number(X) - Number(x)) ** 2 + (Number(Y) - Number(y)) ** 2
  ).toFixed(2);

const findParent = (obj, t) => {
  if (obj[t] !== t) obj[t] = findParent(obj, obj[t]);
  return obj[t];
};

const unionFind = (obj, a, b) => {
  if (a < b) obj[b] = a;
  else obj[a] = b;
};

for (let i = 0; i < N; i++) {
  [X, Y] = arr[i].split(" ").map((el) => el.toString());
  for (let j = i + 1; j < N; j++) {
    let [x, y] = arr[j].split(" ").map((el) => el.toString());
    points.push([i, j, calcWeight(x, y)]);
  }
}

points
  .sort((a, b) => a[2] - b[2])
  .forEach((el) => {
    let [i, j, weight] = el.map(Number);
    if (parent[i] === undefined) parent[i] = i;
    if (parent[j] === undefined) parent[j] = j;
    let parent1 = findParent(parent, i);
    let parent2 = findParent(parent, j);
    if (parent1 !== parent2) {
      unionFind(parent, parent1, parent2);
      answer += weight;
    }
  });

console.log(answer);
