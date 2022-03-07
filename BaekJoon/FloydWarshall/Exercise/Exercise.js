const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [V, E] = nums.split(" ").map((el) => +el);
let answer = [];
let dp = Array(V)
  .fill(null)
  .map((el) => Array(V).fill(Infinity));
arr.forEach((el) => {
  let [from, to, weight] = el.split(" ").map((el2) => +el2);
  dp[from - 1][to - 1] = weight;
});

const floyd = () => {
  for (let k = 0; k < V; k++) {
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        if (k !== i && i !== j) {
          dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j]);
        }
      }
    }
  }
};

floyd();

for (let i = 0; i < V; i++) {
  for (let j = i; j < V; j++) {
    if (dp[i][j] !== Infinity && dp[j][i] !== Infinity) {
      answer.push(dp[i][j] + dp[j][i]);
    }
  }
}

console.log(Math.min(...answer) === Infinity ? -1 : Math.min(...answer));
