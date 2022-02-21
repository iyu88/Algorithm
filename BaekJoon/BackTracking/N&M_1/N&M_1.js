const fs = require("fs");
let [N, M] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => +el);

let answer = [];
let visited = Array(M).fill(0);

const backTracking = (i) => {
  if (visited.every((el) => el !== 0)) {
    answer.push(visited.slice(0));
  } else {
    for (let j = 0; j < N; j++) {
      if (visited[i]) continue;
      visited[i] = j + 1;
      let isDiff = true;
      for (let k = 0; k < i; k++) {
        if (visited[k] === j + 1) {
          isDiff = false;
          break;
        }
      }
      if (isDiff) backTracking(i + 1);
      visited[i] = 0;
    }
  }
};

backTracking(0);

console.log(answer.map((el) => el.join(" ")).join("\n"));
