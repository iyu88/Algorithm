const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let index = 0;
const [R, C] = inputs[index++].split(" ").map(Number);
const k = +inputs[index++];
const obstacle = inputs.slice(index, index + k);
let [SY, SX] = inputs[index + k].split(" ").map(Number);
const directions = inputs[index + k + 1].split(" ").map(Number);
const DY = [null, -1, 1, 0, 0];
const DX = [null, 0, 0, -1, 1];

let currentIndex = 0;
const board = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => "*")
);
const visited = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => false)
);

obstacle.forEach((el) => {
  const [Y, X] = el.split(" ").map(Number);
  board[Y][X] = "x";
});

board[SY][SX] = 0;
visited[SY][SX] = true;

let blockedCount = 0;

while (1) {
  if (blockedCount === directions.length) break;

  const D = directions[currentIndex];
  const [nextY, nextX] = [SY + DY[D], SX + DX[D]];

  if (nextY < 0 || nextX < 0 || nextY >= R || nextX >= C) {
    currentIndex = (currentIndex + 1) % directions.length;
    blockedCount++;
    continue;
  }

  if (visited[nextY][nextX] || board[nextY][nextX] === "x") {
    currentIndex = (currentIndex + 1) % directions.length;
    blockedCount++;
    continue;
  }

  visited[nextY][nextX] = true;
  board[nextY][nextX] = board[SY][SX] + 1;
  [SY, SX] = [nextY, nextX];
  blockedCount = 0;
}

console.log(`${SY} ${SX}`);
