const fs = require("fs");
const [num, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = +num;
let index = 0;

while (index < inputs.length) {
  const [n, l1, l2, s1, s2] = inputs[index++].split(" ").map(Number);
  const dp = Array.from({ length: 2 }, () =>
    Array.from({ length: n + 1 }, () => 0)
  );
  const pass = Array.from({ length: 2 }, () =>
    Array.from({ length: n + 1 }, () => 0)
  );
  const dribble = Array.from({ length: 2 }, () =>
    Array.from({ length: n + 1 }, () => 0)
  );

  pass[0] = inputs[index++].split(" ").map(Number);
  dribble[0] = inputs[index++].split(" ").map(Number);
  pass[1] = inputs[index++].split(" ").map(Number);
  dribble[1] = inputs[index++].split(" ").map(Number);

  dp[0][0] = l1;
  dp[1][0] = l2;

  for (let i = 1; i < n; i++) {
    dp[0][i] = Math.min(
      dp[0][i - 1] + dribble[0][i - 1],
      dp[1][i - 1] + pass[1][i - 1]
    );
    dp[1][i] = Math.min(
      dp[1][i - 1] + dribble[1][i - 1],
      dp[0][i - 1] + pass[0][i - 1]
    );
  }

  console.log(Math.min(dp[0][n - 1] + s1, dp[1][n - 1] + s2));
}
