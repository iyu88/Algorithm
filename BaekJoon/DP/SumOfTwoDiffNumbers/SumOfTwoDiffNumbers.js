const fs = require("fs");
const [_, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const max = Math.max(...inputs);
const MOD = 100999;
const dp = Array.from({ length: max + 1 }, () =>
  Array.from({ length: max + 1 }, () => 0)
);

for (let i = 0; i <= max; i++) {
  dp[0][i] = 1;
}

for (let i = 1; i <= max; i++) {
  for (let j = 1; j <= max; j++) {
    dp[i][j] = dp[i][j - 1];
    if (i >= j) {
      dp[i][j] += dp[i - j][j - 1];
      dp[i][j] %= MOD;
    }
  }
}

const answer = inputs.map((el) => dp[el][el]);

console.log(answer.join("\n"));
