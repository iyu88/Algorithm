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
let answer = 0;
let count = 0;
let dy = [-1, 1, 0, 0];
let dx = [0, 0, -1, 1];
arr = arr.map((el) => el.split(" ").map(Number));

const fillBlock = (i, j) => {
  if (count === 3) return bfs();
  for (let y = i; y < N; y++) {
    for (let x = j; x < M; x++) {
      if (arr[y][x] === 0) {
        count++;
        arr[y][x] = 1;
        fillBlock(i, j);
        count--;
        arr[y][x] = 0;
      }
    }
  }
};

const bfs = () => {
  let $map = arr.map((el) => el.slice());
  let visited = Array(N)
    .fill(null)
    .map((el) => Array(M).fill(false));
  let $q = new queue();
  let result = 0;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (!visited[y][x] && $map[y][x] === 2) {
        visited[y][x] = true;
        $q.add([y, x]);
        while ($q.size()) {
          let [nextY, nextX] = $q.remove();
          for (let k = 0; k < 4; k++) {
            let dyy = dy[k] + nextY;
            let dxx = dx[k] + nextX;
            if (
              dyy > -1 &&
              dyy < N &&
              dxx > -1 &&
              dxx < M &&
              !visited[dyy][dxx] &&
              $map[dyy][dxx] === 0
            ) {
              $map[dyy][dxx] = 2;
              visited[dyy][dxx] = true;
              $q.add([dyy, dxx]);
            }
          }
        }
      }
    }
  }

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if ($map[y][x] === 0) result++;
    }
  }

  answer = Math.max(answer, result);
};

fillBlock(0, 0);

console.log(answer);
