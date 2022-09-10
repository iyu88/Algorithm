const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map(Number);
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
  if (a < b) obj[b] = a;
  else obj[a] = b;
  return;
};

const calcDist = (y1, x1, y2, x2) => {
  return Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
};

arr.splice(N, M).forEach((el) => {
  let [start, end] = el;
  let startParent = findParent(parent, start);
  let endParent = findParent(parent, end);
  if (startParent !== endParent) {
    unionFind(parent, startParent, endParent);
  }
});

for (let i = 0; i < arr.length; i++) {
  let [y1, x1] = arr[i];
  for (let j = i + 1; j < arr.length; j++) {
    let [y2, x2] = arr[j];
    let weight = calcDist(y1, x1, y2, x2);
    points.push([i + 1, j + 1, weight]);
  }
}

points
  .sort((a, b) => a[2] - b[2])
  .forEach((el) => {
    let [from, to, weight] = el;
    let fromParent = findParent(parent, from);
    let toParent = findParent(parent, to);
    if (fromParent !== toParent) {
      unionFind(parent, fromParent, toParent);
      answer += weight;
    }
  });

console.log(answer.toFixed(2));
