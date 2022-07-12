const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map(Number);
let [F, T] = arr.pop().split(" ").map(Number);
let answer;
let points = [];
let parent = {};

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

arr.forEach((el) => points.push(el.split(" ").map(Number)));
points.sort((a, b) => b[2] - a[2]);

for (let i = 0; i < points.length; i++) {
  let [from, to, weight] = points[i];
  if (findParent(parent, F) !== findParent(parent, T)) {
    unionFind(parent, from, to);
    answer = weight;
  }
}

console.log(answer);
