const fs = require("fs");
let [num, nums] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

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

let N = +num;
let answer;
let [r1, c1, r2, c2] = nums.split(" ").map(Number);
let $map = Array(N)
  .fill(null)
  .map((el) => Array(N).fill(false));
let dr = [-2, -2, 0, 0, 2, 2];
let dc = [-1, 1, -2, 2, -1, 1];
let $queue = new queue();
$map[r1][c1] = true;
$queue.add([r1, c1, 0]);

while ($queue.size()) {
  let [a, b, c] = $queue.remove();
  if (a === r2 && b === c2) {
    answer = c;
    break;
  }
  for (let k = 0; k < 6; k++) {
    let drr = dr[k] + a;
    let dcc = dc[k] + b;
    if (dcc > -1 && dcc < N && drr > -1 && drr < N && !$map[drr][dcc]) {
      $map[drr][dcc] = true;
      $queue.add([drr, dcc, c + 1]);
    }
  }
}

console.log(answer === undefined ? -1 : answer);
