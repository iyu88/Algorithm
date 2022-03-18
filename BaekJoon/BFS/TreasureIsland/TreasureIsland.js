const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const Q = function () {
  this.q = {};
  this.front = 0;
  this.rear = 0;

  this.size = () => {
    if (this.q[this.rear] === undefined) return 0;
    else return this.rear - this.front + 1;
  };

  this.add = (num) => {
    if (!this.size()) this.q["0"] = num;
    else {
      this.rear += 1;
      this.q[this.rear] = num;
    }
  };

  this.remove = () => {
    let v = this.q[this.front];
    delete this.q[this.front];
    if (this.front === this.rear) this.front = this.rear = 0;
    else this.front += 1;
    return v;
  };
};

let [N, M] = nums.split(" ").map((el) => +el);
let answer = [];
let count;
let visited = Array(N)
  .fill(null)
  .map((el) => Array(M).fill(false));
let $map = arr.map((el) => el.split(""));
let dy = [-1, 0, 1, 0];
let dx = [0, -1, 0, 1];

let $queue = new Q();

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (visited[y][x] === false && $map[y][x] === "L") {
      count = 0;
      visited[y][x] = 0;
      $queue.add([y, x]);
      while ($queue.size()) {
        let [i, j] = $queue.remove();
        for (let k = 0; k < 4; k++) {
          let dyy = dy[k] + i;
          let dxx = dx[k] + j;
          if (dyy > -1 && dxx > -1 && dyy < N && dxx < M) {
            if (visited[dyy][dxx] === false && $map[dyy][dxx] === "L") {
              visited[dyy][dxx] = visited[i][j] + 1;
              count = Math.max(count, visited[dyy][dxx]);
              $queue.add([dyy, dxx]);
            }
          }
        }
      }
      answer.push(count);
      visited = Array(N)
        .fill(null)
        .map((el) => Array(M).fill(false));
    }
  }
}

console.log(Math.max(...answer));
