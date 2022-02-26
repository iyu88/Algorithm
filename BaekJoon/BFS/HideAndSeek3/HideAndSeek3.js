const fs = require("fs");
let [N, K] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => +el);

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
    let value;
    if (this.front === this.rear) {
      value = this.q[this.front];
      delete this.q[this.front];
      this.front = 0;
      this.rear = 0;
    } else {
      value = this.q[this.front];
      delete this.q[this.front];
      this.front += 1;
    }
    return value;
  };
};

let answer;

const bfs = () => {
  let visited = [];
  let $Q = new Q();
  visited[N] = true;
  $Q.add([N, 0]);
  while ($Q.size()) {
    let [nextN, nextT] = $Q.remove();
    if (nextN === K && (answer === undefined || answer > nextT)) answer = nextT;
    visited[nextN] = true;
    if (!visited[nextN + 1] && nextN + 1 <= 100000)
      $Q.add([nextN + 1, nextT + 1]);
    if (!visited[nextN - 1] && nextN - 1 >= 0) $Q.add([nextN - 1, nextT + 1]);
    if (!visited[nextN * 2] && nextN * 2 <= 100000) $Q.add([nextN * 2, nextT]);
  }
};

bfs();

console.log(answer);
