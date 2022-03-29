const fs = require("fs");
let strs = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(""));

let [a, b, c] = strs.map((el) => el.length);

let dp = Array(a + 1)
  .fill(null)
  .map((el) =>
    Array(b + 1)
      .fill(null)
      .map((el2) => Array(c + 1).fill(0))
  );
for (let k = 1; k < a + 1; k++) {
  for (let y = 1; y < b + 1; y++) {
    for (let x = 1; x < c + 1; x++) {
      if (
        strs[0][k - 1] === strs[1][y - 1] &&
        strs[1][y - 1] === strs[2][x - 1]
      ) {
        dp[k][y][x] = dp[k - 1][y - 1][x - 1] + 1;
      } else {
        dp[k][y][x] = Math.max(
          dp[k - 1][y][x],
          dp[k][y - 1][x],
          dp[k][y][x - 1]
        );
      }
    }
  }
}

console.log(dp[a][b][c]);
