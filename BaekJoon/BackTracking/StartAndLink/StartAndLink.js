const fs = require("fs");
let [num, ...temp] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let N = +num;
let M = Array(N)
  .fill(0)
  .map((el, i) => el + i);
let answer = [];
let min;
let visited = Array(Math.floor(N / 2)).fill(false);
let arr = temp.map((el) => el.split(" ").map((el2) => +el2));

const backTracking = (i = 0, next = 0) => {
  if (visited.every((el) => el !== false)) answer.push(visited.slice(0));
  else {
    for (let j = next; j < M.length; j++) {
      if (visited[i]) continue;
      visited[i] = M[j];
      let isDiff = true;
      for (let k = 0; k < i; k++) {
        if (visited[k] === M[j]) {
          isDiff = false;
          break;
        }
      }
      if (isDiff) backTracking(i + 1, j + 1);
      visited[i] = false;
    }
  }
};

backTracking();
let cases = answer.slice(0);

for (let i = 0; i < Math.floor(cases.length / 2); i++) {
  let sum1 = 0;
  let sum2 = 0;
  visited = Array(2).fill(false);
  answer = [];
  M = cases[i];
  backTracking();
  answer.forEach((el) => {
    sum1 += arr[el[0]][el[1]] + arr[el[1]][el[0]];
  });
  answer = [];
  M = cases[cases.length - 1 - i];
  backTracking();
  answer.forEach((el) => {
    sum2 += arr[el[0]][el[1]] + arr[el[1]][el[0]];
  });
  min === undefined
    ? (min = Math.abs(sum1 - sum2))
    : (min = Math.min(min, Math.abs(sum1 - sum2)));
}

console.log(min);
