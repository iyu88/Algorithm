const fs = require("fs");
let [num, arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = [];
let visited = Array(N + 1).fill(false);
arr = arr.split(" ");

const backTracking = (i) => {
  if (visited.every((el) => el !== false))
    answer.push(visited.slice(0).join(""));
  else {
    for (let j = 0; j < 10; j++) {
      if (visited[i]) continue;
      if (i) {
        if (arr[i - 1] === "<" && visited[i - 1] >= j) continue;
        else if (arr[i - 1] === ">" && visited[i - 1] <= j) continue;
      }
      visited[i] = j;
      let isDiff = true;
      for (let k = 0; k < i; k++) {
        if (visited[k] === visited[i]) {
          isDiff = false;
          break;
        }
      }
      if (isDiff) backTracking(i + 1);
      visited[i] = false;
    }
  }
};

backTracking(0);

let sorted = answer.sort();
console.log(sorted[sorted.length - 1]);
console.log(sorted[0]);
