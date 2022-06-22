const fs = require("fs");
let [F, S, G, U, D] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

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

let answer;

const bfs = () => {
  let visited = Array(F + 1).fill(false);
  let $q = new queue();
  visited[S] = true;
  $q.add([S, 0]);
  while ($q.size()) {
    let [next, count] = $q.remove();
    if (next === G) {
      answer = count;
      return;
    }
    if (!visited[next + U] && next + U <= F && 1 <= next + U) {
      visited[next + U] = true;
      $q.add([next + U, count + 1]);
    }
    if (!visited[next - D] && next - D <= F && 1 <= next - D) {
      visited[next - D] = true;
      $q.add([next - D, count + 1]);
    }
  }
};

bfs();

console.log(answer ?? "use the stairs");
