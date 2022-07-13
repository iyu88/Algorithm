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
    if (this.size() === 0) this.q["0"] = num;
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
let dp = Array(N + 1).fill(1);
let visited = Array(N + 1).fill(0);
let points = Array(N + 1)
  .fill(null)
  .map((el) => []);
let $q = new queue();
arr.forEach((el) => {
  let [from, to] = el.split(" ").map(Number);
  points[from].push(to);
  visited[to]++;
});

visited.forEach((el, i) => {
  if (i !== 0 && el === 0) $q.add(i);
});

while ($q.size()) {
  let next = $q.remove();
  for (const el of points[next]) {
    visited[el]--;
    dp[el] = Math.max(dp[el], dp[next] + 1);
    if (visited[el] === 0) $q.add(el);
  }
}

console.log(dp.slice(1).join(" "));
