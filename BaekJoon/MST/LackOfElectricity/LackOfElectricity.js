const fs = require("fs");
let [nums, plant, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

let [N, M, K] = nums;
let answer = 0;
let parent = {};

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

for (let i = 0; i < K - 1; i++) {
  let currParent = findParent(parent, plant[i]);
  let nextParent = findParent(parent, plant[i + 1]);
  unionFind(parent, currParent, nextParent);
}

arr
  .sort((a, b) => a[2] - b[2])
  .forEach((el) => {
    const [from, to, weight] = el;
    let fromParent = findParent(parent, from);
    let toParent = findParent(parent, to);
    if (fromParent !== toParent) {
      unionFind(parent, fromParent, toParent);
      answer += weight;
    }
  });

console.log(answer);
