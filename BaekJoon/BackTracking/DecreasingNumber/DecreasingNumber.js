const fs = require("fs");
let N = fs.readFileSync("/dev/stdin").toString() * 1;

let answer = [];
let visited = Array(7).fill(false);

const isDecreasing = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] <= arr[i]) {
      return false;
    }
  }
  return true;
};

const backTracking = (i, next = 0) => {
  answer.push(
    Number(
      visited
        .slice(0)
        .filter((el) => el !== false)
        .join("")
    )
  );
  for (let j = next; j < 10; j++) {
    if (visited[i]) continue;
    visited[i] = j;
    if (isDecreasing(visited.slice(0).filter((el) => el !== false)))
      backTracking(i + 1);
    visited[i] = false;
  }
};

backTracking(0, 1);

console.log(answer.sort((a, b) => a - b)[N] ?? -1);
