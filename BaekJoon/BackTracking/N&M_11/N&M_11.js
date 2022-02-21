const fs = require("fs");
let [nums, arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, M] = nums.split(" ").map((el) => +el);
let answer = [];
let visited = Array(M).fill(0);
arr = arr
  .split(" ")
  .map((el) => +el)
  .sort((a, b) => a - b);

const backTracking = (i) => {
  if (!visited.some((el) => el === 0)) answer.push(visited.slice(0));
  else {
    for (let j = 0; j < N; j++) {
      if (visited[i]) continue;
      visited[i] = arr[j];
      backTracking(i + 1);
      visited[i] = 0;
    }
  }
};

backTracking(0);

console.log([...new Set(answer.map((el) => el.join(" ")))].join("\n"));
