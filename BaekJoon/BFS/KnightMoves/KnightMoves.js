const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const DY = [-1, -2, -2, -1, 1, 2, 2, 1];
const DX = [-2, -1, 1, 2, 2, 1, -1, -2];

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
    delete this.q[this.front];
    if (this.front !== this.rear) this.front++;
    this.length--;
    return value;
  };
};

const convertNumberPos = (target) => {
  const [char, number] = target.split("");
  return [char.charCodeAt(0) - 97, number - 1];
};

const answer = inputs.map((el) => {
  const [from, to] = el.split(" ");

  const bfs = (y1, x1, y2, x2) => {
    const visited = Array.from({ length: 8 }, () =>
      Array.from({ length: 8 }, () => false)
    );
    const queue = new Queue();

    visited[y1][x1] = true;
    queue.add([y1, x1, 0]);

    while (queue.length) {
      const [currentY, currentX, currentCount] = queue.remove();
      if (currentY === y2 && currentX === x2) return currentCount;

      for (let k = 0; k < 8; k++) {
        const nextY = currentY + DY[k];
        const nextX = currentX + DX[k];

        if (nextY < 0 || nextX < 0 || nextY >= 8 || nextX >= 8) continue;
        if (visited[nextY][nextX]) continue;

        visited[nextY][nextX] = true;
        queue.add([nextY, nextX, currentCount + 1]);
      }
    }
  };

  const result = bfs(...convertNumberPos(from), ...convertNumberPos(to));

  return `To get from ${from} to ${to} takes ${result} knight moves.`;
});

console.log(answer.join("\n"));
