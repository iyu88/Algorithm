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
    let value = this.q[this.front];
    delete this.q[this.front];
    if (this.front === this.rear) this.front = this.rear = 0;
    else this.front += 1;
    return value;
  };
};

let [N, M] = nums.split(" ").map((el) => +el);
let answer;
let visited = Array.from(Array(2), () =>
  Array.from(Array(N), () => Array(M).fill(false))
);
let $map = arr.map((el) => el.split("").map((el2) => +el2));
let dy = [-1, 0, 1, 0];
let dx = [0, -1, 0, 1];

const bfs = () => {
  let $Q = new Q();
  $Q.add([0, 0, 0, 0]); // y, x, dist, isBreak
  visited[0][0][0] = true;
  visited[1][0][0] = true;
  while ($Q.size()) {
    let [y, x, dist, isBreak] = $Q.remove();
    if (y === N - 1 && x === M - 1 && (answer === undefined || answer > dist))
      answer = dist;
    else {
      for (let k = 0; k < dy.length; k++) {
        let dyy = dy[k] + y;
        let dxx = dx[k] + x;
        if (
          dyy > -1 &&
          dxx > -1 &&
          dyy < N &&
          dxx < M &&
          !visited[isBreak][dyy][dxx]
        ) {
          if (!$map[dyy][dxx]) {
            visited[isBreak][dyy][dxx] = true;
            $Q.add([dyy, dxx, dist + 1, isBreak]);
          } else if ($map[dyy][dxx] && !isBreak) {
            visited[isBreak + 1][dyy][dxx] = true;
            $Q.add([dyy, dxx, dist + 1, isBreak + 1]);
          }
        }
      }
    }
  }
};

bfs();

console.log(answer === undefined ? -1 : answer + 1);
