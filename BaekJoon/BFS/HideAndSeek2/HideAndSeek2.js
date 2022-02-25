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
    if (!this.size()) {
      this.q["0"] = num;
    } else {
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

let q = new Q();
q.add([N, 0]);
let answer = [undefined, 0];
let visited = [];
visited[N] = true;
while (q.size()) {
  let [next, time] = q.remove();
  visited[next] = true;
  if (next === K && answer[0] === undefined) answer[0] = time;
  if (next === K && answer[0] === time) answer[1]++;
  if (!visited[next + 1] && next + 1 <= 100000) {
    q.add([next + 1, time + 1]);
  }
  if (!visited[next - 1] && next - 1 >= 0) {
    q.add([next - 1, time + 1]);
  }
  if (!visited[next * 2] && next * 2 <= 100000) {
    q.add([next * 2, time + 1]);
  }
}

console.log(answer.join("\n"));
