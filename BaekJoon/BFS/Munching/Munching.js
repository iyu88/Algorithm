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
    if (this.length === 0) return null;
    const value = this.q[this.front];
    if (this.front !== this.rear) this.front++;
    this.length--;
    return value;
  };
};

const [N, M] = nums.split(" ").map(Number);
const board = inputs.map((el) => el.split(""));
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];
const Q = new Queue();
let answer = Infinity;

Q.add([0, 0, 0]);
visited[0][0] = true;

while (Q.length) {
  const [Y, X, C] = Q.remove();

  for (let k = 0; k < 4; k++) {
    const DYY = DY[k] + Y;
    const DXX = DX[k] + X;

    if (DYY < 0 || DXX < 0 || DYY >= N || DXX >= M) continue;

    if (board[DYY][DXX] === "C") {
      answer = Math.min(answer, C + 1);
      continue;
    }

    if (visited[DYY][DXX] === false && board[DYY][DXX] === ".") {
      visited[DYY][DXX] = true;
      Q.add([DYY, DXX, C + 1]);
    }
  }
}

console.log(answer);
