const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const queue = function () {
  this.q = {};
  this.front = this.rear = 0;

  this.size = () => {
    if (this.q[this.rear] === undefined) return 0;
    else return this.rear - this.front + 1;
  };

  this.add = (num) => {
    if (!this.size()) this.q["0"] = num;
    else {
      this.rear++;
      this.q[this.rear] = num;
    }
  };

  this.remove = () => {
    let v = this.q[this.front];
    delete this.q[this.front];
    if (this.front === this.rear) this.front = this.rear = 0;
    else this.front++;
    return v;
  };
};

let [N, M] = nums.split(" ").map(Number);
let answer = [];
let visited;
let $q;
let points = [];
let dy = [-1, 1, 0, 0];
let dx = [0, 0, -1, 1];
arr = arr.map((el) => el.split(" ").map(Number));

const bfs = (y, x, f, t) => {
  $q = new queue();
  $q.add([y, x]);
  while ($q.size()) {
    let [nextY, nextX] = $q.remove();
    for (let k = 0; k < 4; k++) {
      let dyy = dy[k] + nextY;
      let dxx = dx[k] + nextX;
      if (dyy > -1 && dyy < N && dxx > -1 && dxx < M && !visited[dyy][dxx]) {
        if (arr[dyy][dxx] === f) {
          visited[dyy][dxx] = true;
          arr[dyy][dxx] = t;
          $q.add([dyy, dxx]);
        } else if (arr[dyy][dxx] === t) {
          visited[dyy][dxx] = true;
          $q.add([dyy, dxx]);
        }
      }
    }
  }
};

while (
  answer[answer.length - 1] === undefined ||
  answer[answer.length - 1] !== 0
) {
  answer.push(0);
  visited = Array(N)
    .fill(null)
    .map((el) => Array(M).fill(false));
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (!visited[y][x] && arr[y][x] === 1) answer[answer.length - 1]++;
    }
  }
  if (answer[answer.length - 1] === 0) break;

  visited = Array(N)
    .fill(null)
    .map((el) => Array(M).fill(false));
  visited[0][0] = true;
  arr[0][0] = 2;
  bfs(0, 0, 0, 2);

  visited = Array(N)
    .fill(null)
    .map((el) => Array(M).fill(false));
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (!visited[y][x] && arr[y][x] === 1) {
        let isAir = 0;
        for (let k = 0; k < 4; k++) {
          let dyy = dy[k] + y;
          let dxx = dx[k] + x;
          if (
            dyy > -1 &&
            dyy < N &&
            dxx > -1 &&
            dxx < M &&
            arr[dyy][dxx] === 2
          ) {
            isAir++;
            if (isAir) {
              points.push([y, x]);
              break;
            }
          }
        }
      }
    }
  }
  points.forEach((el) => {
    let [y, x] = el;
    arr[y][x] = 2;
  });
  points = [];
}

console.log(answer.length - 1);
console.log(answer[answer.length - 2]);
