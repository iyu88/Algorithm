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

let [R, C] = nums.split(" ").map(Number);
let answer;
let visited = Array(R)
  .fill(null)
  .map((el) => Array(C).fill(false));
arr = arr.map((el) => el.split(""));
let dy = [-1, 0, 1, 0];
let dx = [0, -1, 0, 1];
let w = new queue();
let q = new queue();
let D, S;

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (arr[i][j] === "*") w.add([i, j]);
    if (arr[i][j] === "D") D = [i, j];
    if (arr[i][j] === "S") S = [i, j];
  }
}

const updateMap = () => {
  let newW = new queue();

  while (w.size()) {
    let [i, j] = w.remove();
    for (let k = 0; k < 4; k++) {
      let dyy = i + dy[k];
      let dxx = j + dx[k];
      if (dyy >= R || dyy < 0 || dxx >= C || dxx < 0) continue;
      if (arr[dyy][dxx] === ".") {
        arr[dyy][dxx] = "*";
        newW.add([dyy, dxx]);
      }
    }
  }

  return newW;
};

const bfs = () => {
  visited[S[0]][S[1]] = true;
  q.add([S[0], S[1], 0]);
  while (q.size()) {
    let len = q.size();
    w = updateMap();
    for (let m = 0; m < len; m++) {
      let [nextY, nextX, count] = q.remove();
      if (nextY === D[0] && nextX === D[1]) {
        answer = count;
        break;
      }
      for (let k = 0; k < 4; k++) {
        let dyy = nextY + dy[k];
        let dxx = nextX + dx[k];
        if (dyy >= R || dyy < 0 || dxx >= C || dxx < 0) continue;
        if (
          !visited[dyy][dxx] &&
          (arr[dyy][dxx] === "." || arr[dyy][dxx] === "D")
        ) {
          visited[dyy][dxx] = true;
          q.add([dyy, dxx, count + 1]);
        }
      }
    }
  }
};

bfs();

console.log(answer ? answer : "KAKTUS");
