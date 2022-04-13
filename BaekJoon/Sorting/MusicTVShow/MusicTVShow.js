const fs = require("fs");
let [[N, M], ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map((el2) => +el2));

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

let answer = [];
let visited = Array(N + 1).fill(0);
let points = Array(N + 1)
  .fill(null)
  .map((el) => []);
arr.forEach((el) => {
  let len = el.splice(0, 1);
  for (let k = 1; k < len; k++) {
    points[el[k - 1]].push(el[k]);
    visited[el[k]]++;
  }
});

let q = new queue();

visited.forEach((el, index) => {
  if (!el && index) q.add(index);
});

while (q.size()) {
  let next = q.remove();
  answer.push(next);
  for (const el of points[next]) {
    visited[el]--;
    if (!visited[el]) q.add(el);
  }
}

console.log(answer.length === N ? answer.join("\n") : 0);
