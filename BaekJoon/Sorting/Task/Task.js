const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

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
let visited = Array(N).fill(0);
let costs = [];
let points = Array(N)
  .fill(null)
  .map((el) => []);
let tasks = Array(N)
  .fill(null)
  .map((el) => []);
let dp = Array(N + 1).fill(0);
let $q = new queue();

arr.forEach((el, from) => {
  let [cost, num, ...rest] = el.split(" ").map(Number);
  costs.push(cost);
  rest.forEach((el2, to) => {
    points[el2 - 1].push(from);
    visited[from]++;
  });
});

visited.forEach((el, i) => {
  if (el === 0) {
    $q.add(i);
    dp[i] = costs[i];
  }
});

while ($q.size()) {
  let next = $q.remove();
  for (const el of points[next]) {
    visited[el]--;
    dp[el] = Math.max(dp[el], dp[next] + costs[el]);
    if (visited[el] === 0) $q.add(el);
  }
}

console.log(Math.max(...dp));
