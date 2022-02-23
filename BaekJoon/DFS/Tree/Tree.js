let fs = require("fs");
let [num, arr, remove] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let N = +num;
let R = +remove;
let S;
let visited = Array(N).fill(false);
let points = Array.from(Array(N), () => []);
arr = arr.split(" ").forEach((el, i) => {
  if (el == -1) {
    S = i;
  } else {
    points[Number(el)].push(i);
  }
});
let count = 0;

const dfs = (i) => {
  if (i !== R && !visited[i]) {
    visited[i] = true;
    if (points[i].filter((el) => el !== R).length) {
      for (const el of points[i]) {
        if (el !== R && !visited[el]) {
          dfs(el);
        }
      }
    } else {
      count++;
    }
  }
};

dfs(S);

console.log(count);
