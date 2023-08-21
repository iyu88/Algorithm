const fs = require("fs");
const [nums, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const Queue = function () {
  this.q = {};
  this.front = this.rear = this.length = 0;

  this.add = (value) => {
    if (this.length === 0) this.q[this.rear] = value;
    else this.q[++this.rear] = value;
    this.length++;
  };

  this.remove = () => {
    const value = this.q[this.front];
    delete this.q[this.front];
    if (this.front !== this.rear) this.front++;
    this.length--;
    return value;
  };
};

const [N, M] = nums.split(" ").map(Number);
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];
const board = inputs.map((el) => el.split(""));

const fillChar = (y, x, char) => {
  const Q = new Queue();

  board[y][x] = char;
  Q.add([y, x]);

  while (Q.length) {
    const [currentY, currentX] = Q.remove();

    for (let k = 0; k < 4; k++) {
      const nextY = DY[k] + currentY;
      const nextX = DX[k] + currentX;

      if (nextY < 0 || nextX < 0 || nextY >= N || nextX >= M) continue;
      if (board[nextY][nextX] === ".") continue;

      if (board[nextY][nextX] === "X") {
        board[nextY][nextX] = char;
        Q.add([nextY, nextX]);
      }
    }
  }
};

let number = 1;
for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (board[y][x] === "X") {
      fillChar(y, x, number.toString());
      number++;
    }
    if (number === 3) break;
  }
  if (number === 3) break;
}

const connectNumber = (y, x, copiedBoard) => {
  const Q = new Queue();

  copiedBoard[y][x] = 0;
  Q.add([y, x]);

  while (Q.length) {
    const [currentY, currentX] = Q.remove();

    for (let k = 0; k < 4; k++) {
      const nextY = DY[k] + currentY;
      const nextX = DX[k] + currentX;

      if (nextY < 0 || nextX < 0 || nextY >= N || nextX >= M) continue;

      if (copiedBoard[nextY][nextX] === "2") {
        return copiedBoard[currentY][currentX];
      }

      if (copiedBoard[nextY][nextX] === ".") {
        copiedBoard[nextY][nextX] = copiedBoard[currentY][currentX] + 1;
        Q.add([nextY, nextX]);
      }
    }
  }

  return -1;
};

let answer = N * M;
for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (board[y][x] === "1") {
      const copiedBoard = board.map((el) => el.slice());
      const count = connectNumber(y, x, copiedBoard);
      if (count > 0) answer = Math.min(answer, count);
    }
  }
}

console.log(answer);
