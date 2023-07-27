const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const Node = function (value, prev = null, next = null) {
  this.value = value;
  this.prev = prev;
  this.next = next;
};

const Queue = function () {
  this.head = new Node(null);
  this.tail = new Node(null);
  this.head.next = this.tail;
  this.tail.prev = this.head;
  this.length = 0;

  this.push = (value) => {
    const node = new Node(value);
    const tailPrev = this.tail.prev;
    node.next = this.tail;
    node.prev = tailPrev.prev;
    this.tail.prev = node;
    tailPrev.next = node;
    this.length++;
  };

  this.pop = () => {
    const headNext = this.head.next;
    const value = headNext.value;
    this.head.next = headNext.next;
    headNext.next.prev = this.head;
    this.length--;
    return value;
  };
};

const answer = [];
let index = 0;

while (index < inputs.length - 1) {
  const [N, M] = inputs[index++].split(" ").map(Number);
  const board = inputs.slice(index, index + M).map((el) => el.split(""));
  const visited = Array.from({ length: M }, () =>
    Array.from({ length: N }, () => false)
  );
  const Q = new Queue();
  const DY = [-1, 0, 1, 0];
  const DX = [0, -1, 0, 1];
  let [Y, X] = [null, null];

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === "@") {
        [Y, X] = [i, j];
        break;
      }
    }
    if (Y !== null) break;
  }

  const bfs = () => {
    let count = 1;

    visited[Y][X] = true;
    Q.push([Y, X]);

    while (Q.length) {
      const [currentY, currentX] = Q.pop();

      for (let k = 0; k < 4; k++) {
        const nextY = DY[k] + currentY;
        const nextX = DX[k] + currentX;

        if (nextY < 0 || nextX < 0 || nextY >= M || nextX >= N) continue;

        if (visited[nextY][nextX] === false && board[nextY][nextX] === ".") {
          count++;
          visited[nextY][nextX] = true;
          Q.push([nextY, nextX]);
        }
      }
    }

    return count;
  };

  answer.push(bfs());

  index += M;
}

console.log(answer.join("\n"));
