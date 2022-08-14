const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const queue = function () {
  this.q = {};
  this.front = this.rear = 0;

  this.size = () => {
    if (this.q[this.rear] === undefined) return 0;
    else return this.rear - this.front + 1;
  };

  this.add = (num) => {
    if (!this.size()) this.q["0"] = num;
    else this.q[++this.rear] = num;
  };

  this.remove = () => {
    let v = this.q[this.front];
    delete this.q[this.front];
    if (this.front === this.rear) this.front = this.rear = 0;
    else this.front++;
    return v;
  };
};

let [N, M] = nums;
let answer = 0;
let visited = Array(N)
  .fill(null)
  .map((el) => Array(M).fill(0));
let dx = [0, 1, 1, 1, 0, -1, -1, -1];
let dy = [-1, -1, 0, 1, 1, 1, 0, -1];
let q = new queue();

const bfs = () => {
  while (q.size()) {
    let [y, x] = q.remove();
    for (let k = 0; k < 8; k++) {
      let dyy = dy[k] + y;
      let dxx = dx[k] + x;
      if (dyy > -1 && dyy < N && dxx > -1 && dxx < M) {
        if (visited[dyy][dxx] !== 0 || arr[dyy][dxx] === 1) continue;
        visited[dyy][dxx] = visited[y][x] + 1;
        answer = Math.max(answer, visited[dyy][dxx]);
        q.add([dyy, dxx]);
      }
    }
  }
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (arr[i][j] === 1) q.add([i, j]);
  }
}

bfs();

console.log(answer);
