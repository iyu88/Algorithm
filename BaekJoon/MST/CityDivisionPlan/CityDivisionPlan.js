const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map(Number);
let answer = 0;
let count = 0;
let index = 0;
let parent = {};
let points = [];
arr.forEach((el) => points.push(el.split(" ").map(Number)));
points.sort((a, b) => a[2] - b[2]);

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
};

while (count < N - 2) {
  let [from, to, weight] = points[index];
  let fromParent = findParent(parent, from);
  let toParent = findParent(parent, to);
  if (fromParent !== toParent) {
    unionFind(parent, fromParent, toParent);
    answer += weight;
    count++; // 사이클이 발생하지 않아 최소 간선으로 선택된 경우
  }
  index++;
}

console.log(answer);
