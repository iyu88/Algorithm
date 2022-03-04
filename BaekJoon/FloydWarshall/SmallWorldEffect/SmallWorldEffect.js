const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map((el) => +el);
let dp = Array(N)
  .fill(null)
  .map((el) => Array(N).fill(Infinity));
arr.forEach((el) => {
  let [from, to] = el.split(" ").map((el2) => +el2);
  if (dp[from - 1][to - 1] === Infinity && dp[to - 1][from - 1] === Infinity)
    dp[from - 1][to - 1] = dp[to - 1][from - 1] = 1;
});

const floyd = () => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < N; k++) {
        if (i !== j && j !== k) {
          dp[j][k] = Math.min(dp[j][i] + dp[i][k], dp[j][k]);
        }
      }
    }
  }
};

floyd();

let sum = dp.map((el, i) =>
  el.reduce((acc, cur, i2) => {
    if (i !== i2) acc += cur;
    return acc;
  }, 0)
);

let min = Math.min(...sum);

for (let [index, el] of sum.entries()) {
  if (el === min) {
    console.log(index + 1);
    break;
  }
}
