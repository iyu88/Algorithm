const fs = require("fs");
let [nums, arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, M] = nums.split(" ").map((el) => +el);
let answer = 0;
arr = arr.split("");
let visited = Array(N)
  .fill(null)
  .map((el, i) => (arr[i] === "H" ? false : "P"));

for (let i = 0; i < N; i++) {
  if (arr[i] === "P") {
    for (let j = i - M; j <= i + M; j++) {
      if (j > -1 && j < N && !visited[j]) {
        visited[j] = true;
        answer++;
        break;
      }
    }
  }
}

console.log(answer);
