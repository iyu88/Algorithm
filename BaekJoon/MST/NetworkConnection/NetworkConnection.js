const fs = require("fs");
let [num, lines, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let N = +num;
let L = +lines;
let answer = 0;
let points = [];
let parent = {};

for (let i = 1; i <= N; i++) {
  parent[i] = i;
}

arr.forEach((el) => points.push(el.split(" ").map(Number)));

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

points
  .sort((a, b) => a[2] - b[2])
  .forEach((el) => {
    let [from, to, weight] = el;
    if (findParent(parent, from) !== findParent(parent, to)) {
      unionFind(parent, from, to);
      answer += weight;
    }
  });

console.log(answer);
