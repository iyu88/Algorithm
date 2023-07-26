const fs = require("fs");
const [_, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const max = Math.max(...inputs);
const dp = Array(max + 1).fill(0);
dp[1] = 1;
dp[2] = 2;
dp[3] = 2;

for (let i = 4; i <= max; i++) {
  const half_quotient = Math.floor(i / 2);
  if (half_quotient) {
    dp[i] = dp[half_quotient] + dp[i - 2];
  } else {
    dp[i] = dp[i - 2] + 2;
  }
}

inputs.map((el) => console.log(dp[el]));
