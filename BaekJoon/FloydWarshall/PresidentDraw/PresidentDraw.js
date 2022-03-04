const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = [];
let dp = Array(N)
  .fill(null)
  .map((el) => Array(N).fill(Infinity));
arr.forEach((el) => {
  let [from, to] = el.split(" ").map((el2) => +el2);
  if (
    from > 0 &&
    dp[from - 1][to - 1] === Infinity &&
    dp[to - 1][from - 1] === Infinity
  ) {
    dp[from - 1][to - 1] = dp[to - 1][from - 1] = 1;
  }
});

const floyd = () => {
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (k !== i) {
          if (i !== j) dp[i][j] = Math.min(dp[i][k] + dp[k][j], dp[i][j]);
          if (i === j) dp[i][j] = 0;
        }
      }
    }
  }
};

floyd();

let max = dp.map((el, i) => Math.max(...el.slice(0, i), ...el.slice(i + 1)));
let min = Math.min(...max);
max.forEach((el, i) => {
  if (el === min) answer.push(i + 1);
});

console.log(`${min} ${answer.length}`);
console.log(answer.join(" "));
