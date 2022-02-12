const fs = require("fs");
let [N, K] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => +el);

let answer;
let visited = Array().fill(false);
let q = [];
q.push({ p: N, t: 0 });

while (q.length) {
  let { p: nextP, t: nextT } = q.shift();
  if (nextP === K) {
    answer = nextT;
    break;
  }
  if (!visited[nextP]) {
    visited[nextP] = true;
    if (!visited[nextP + 1]) {
      q.push({ p: nextP + 1, t: nextT + 1 });
    }
    if (!visited[nextP - 1] && nextP - 1 >= 0) {
      q.push({ p: nextP - 1, t: nextT + 1 });
    }
    if (!visited[nextP * 2] && nextP * 2 <= 100000) {
      q.push({ p: nextP * 2, t: nextT + 1 });
    }
  }
}

console.log(answer);
