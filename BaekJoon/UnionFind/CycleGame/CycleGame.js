const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map(Number);
let answer = 0;
let parent = {};

for (let i = 0; i < N; i++) {
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

for (let i = 0; i < M; i++) {
  let [from, to] = arr[i].split(" ").map(Number);
  let parentFrom = findParent(parent, from);
  let parentTo = findParent(parent, to);
  if (parentFrom === parentTo) {
    answer = i + 1;
    break;
  } else unionFind(parent, parentFrom, parentTo);
}

console.log(answer);
