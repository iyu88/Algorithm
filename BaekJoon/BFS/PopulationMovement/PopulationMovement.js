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

let [N, L, R] = nums.split(" ").map(Number);
let answer = -1;
let visited;
let isUnion = 0;
let dy = [-1, 1, 0, 0];
let dx = [0, 0, -1, 1];
arr = arr.map((el) => el.split(" ").map(Number));

const bfs = (y, x) => {
  let union = [];
  let $q = new queue();
  let result = [arr[y][x]];
  visited[y][x] = true;
  union.push([y, x]);
  $q.add([y, x]);
  while ($q.size()) {
    let [nextY, nextX] = $q.remove();
    for (let k = 0; k < 4; k++) {
      let dyy = dy[k] + nextY;
      let dxx = dx[k] + nextX;
      if (dyy > -1 && dyy < N && dxx > -1 && dxx < N && !visited[dyy][dxx]) {
        let sub = Math.abs(arr[nextY][nextX] - arr[dyy][dxx]);
        if (L <= sub && sub <= R) {
          visited[dyy][dxx] = true;
          union.push([dyy, dxx]);
          result.push(arr[dyy][dxx]);
          $q.add([dyy, dxx]);
        }
      }
    }
  }

  if (result.length > 1) {
    let $newValue = Math.floor(
      result.reduce((acc, cur) => acc + cur, 0) / result.length
    );
    union.forEach((el) => (arr[el[0]][el[1]] = $newValue));
  }
};

while (isUnion !== N ** 2) {
  answer++;
  isUnion = 0;
  visited = Array(N)
    .fill(null)
    .map((el) => Array(N).fill(false));
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (!visited[y][x]) {
        isUnion++;
        bfs(y, x);
      }
    }
  }
}

console.log(answer);
