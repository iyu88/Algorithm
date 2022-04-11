const fs = require("fs");
let [[V, E], ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map((el2) => +el2));

let sum = 0;
let parent = Array(V)
  .fill(0)
  .map((el, index) => el + index);
let points = [];
arr.forEach((el) => {
  points.push(el);
});

points.sort((a, b) => a[2] - b[2]);

const findParent = (arr, t) => {
  if (arr[t] !== t) {
    arr[t] = findParent(arr, arr[t]);
  }
  return arr[t];
};

const unionFind = (arr, a, b) => {
  a = findParent(arr, a);
  b = findParent(arr, b);
  if (a < b) {
    arr[b] = a;
  } else {
    arr[a] = b;
  }
  return arr;
};

points.forEach((el) => {
  let [a, b, c] = el;
  if (findParent(parent, a) !== findParent(parent, b)) {
    parent = unionFind(parent, a, b);
    sum += c;
  }
});

console.log(sum);
