const fs = require("fs");
let [n, m, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let N = +n;
let M = +m;
let answer = [];
let parent = Array(N + 1)
  .fill(0)
  .map((el, i) => el + i);
let routes = arr.pop();

const findParent = (arr, t) => {
  if (arr[t] !== t) arr[t] = findParent(arr, arr[t]);
  return arr[t];
};

const unionFind = (arr, a, b) => {
  a = findParent(arr, a);
  b = findParent(arr, b);
  if (a < b) arr[b] = a;
  else arr[a] = b;
  return arr;
};

arr.forEach((el, from) => {
  el.split(" ").map((el2, to) => {
    if (Number(el2) === 1) unionFind(parent, from + 1, to + 1);
  });
});

routes.split(" ").map((el) => {
  answer.push(findParent(parent, el));
});

console.log([...new Set(answer)].length === 1 ? "YES" : "NO");
