const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map((el) => +el);
let answer = [];
let dp = Array(N)
  .fill(null)
  .map((el) => Array(N).fill(Infinity));
arr.forEach((el) => {
  let [from, to] = el.split(" ").map((el2) => +el2);
  dp[from - 1][to - 1] = 1;
});

const floyd = () => {
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (k !== i && i !== j) {
          dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j]);
        }
      }
    }
  }
};

floyd();

for (let i = 0; i < N; i++) {
  let isAnswer = true;
  for (let j = 0; j < N; j++) {
    if (i !== j) {
      if (dp[i][j] === Infinity && dp[j][i] === Infinity) {
        isAnswer = false;
        break;
      }
    }
  }
  if (isAnswer) answer.push(i + 1);
}

console.log(answer.length);
