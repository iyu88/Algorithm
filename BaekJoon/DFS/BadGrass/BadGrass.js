const fs = require("fs");
const [nums, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M] = nums.split(" ").map(Number);
const DY = [-1, 0, 1, 0, -1, -1, 1, 1];
const DX = [0, -1, 0, 1, 1, -1, 1, -1];
const board = inputs.map((el) => el.split(" ").map(Number));
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);
let answer = 0;

const dfs = (y, x) => {
  for (let k = 0; k < 8; k++) {
    const nextY = DY[k] + y;
    const nextX = DX[k] + x;

    if (nextY < 0 || nextX < 0 || nextY >= N || nextX >= M) continue;

    if (visited[nextY][nextX] === false && board[nextY][nextX]) {
      visited[nextY][nextX] = true;
      dfs(nextY, nextX);
    }
  }
};

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (visited[y][x] === false && board[y][x]) {
      visited[y][x] = true;
      dfs(y, x);
      answer++;
    }
  }
}

console.log(answer);
