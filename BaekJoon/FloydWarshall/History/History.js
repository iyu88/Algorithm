const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, K] = nums.split(" ").map(Number);
let answer = [];
let dp = Array.from(Array(N), () => Array(N).fill(Infinity));
let index = 0;
let events = arr.slice(index, index + K);
index += K;
let M = +arr[index++];
let questions = arr.slice(index);

events.forEach((el) => {
  let [from, to] = el.split(" ").map((el2) => el2 - 1);
  if (dp[from][to] === Infinity) dp[from][to] = 1;
});

for (let k = 0; k < N; k++) {
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (k !== y && y !== x)
        dp[y][x] = Math.min(dp[y][x], dp[k][x] + dp[y][k]);
    }
  }
}

while (M) {
  let [y, x] = questions[questions.length - M].split(" ").map((el) => el - 1);
  if (dp[y][x] === Infinity && dp[x][y] === Infinity) answer.push(0);
  else if (dp[y][x] !== Infinity && dp[x][y] === Infinity) answer.push(-1);
  else answer.push(1);
  M--;
}

console.log(answer.join("\n"));
