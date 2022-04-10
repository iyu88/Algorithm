const fs = require("fs");
let [num, line, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const queue = function () {
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
let answer = Array(N)
  .fill(null)
  .map((el) => Array(N).fill(0));
let visited = Array(N).fill(0);
let points = Array(N)
  .fill(null)
  .map((el) => []);
arr.forEach((el) => {
  let [to, from, count] = el.split(" ").map((el) => +el);
  points[from - 1].push([to - 1, count]);
  visited[to - 1]++;
});

let q = new queue();
let init = [];
visited.forEach((el, index) => {
  if (!el) {
    q.add(index);
    init.push(index);
  }
});

while (q.size()) {
  let next = q.remove();
  for (const el of points[next]) {
    let [to, count] = el;
    if (init.includes(next)) answer[to][next] += count;
    else {
      for (let i = 0; i < N; i++) {
        answer[to][i] += answer[next][i] * count;
      }
    }
    visited[to]--;
    if (!visited[to]) q.add(to);
  }
}

console.log(
  answer[N - 1]
    .map((el, index) => [index + 1, el])
    .filter((el2) => el2[1] !== 0)
    .map((el3) => el3.join(" "))
    .join("\n")
);
