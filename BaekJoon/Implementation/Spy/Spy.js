const fs = require("fs");
const [nums, ...board] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [N, M] = nums;
let answer = 0;

const dfs = (day, sum, prev) => {
  if (day === N) {
    if (sum >= M) answer++;
    return;
  }

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      const nextSum =
        sum + (j === prev ? Math.floor(board[i][j] / 2) : board[i][j]);
      dfs(day + 1, nextSum, j);
    }
  }
};

dfs(0, 0, -1);

console.log(answer);
