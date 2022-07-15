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

let T = +num;
let answer = [];
let index = 0;

while (index < arr.length) {
  let [N, M] = arr[index++].split(" ").map(Number);
  let visited = Array(N + 1).fill(0);
  let dp = Array(N + 1).fill(0);
  let times = arr[index++].split(" ").map(Number);
  let points = Array(N + 1)
    .fill(null)
    .map((el) => []);
  let end = index + M;
  arr.slice(index, end).map((el) => {
    let [from, to] = el.split(" ").map(Number);
    points[from].push(to);
    visited[to]++;
  });
  let target = arr[end];
  let $q = new queue();

  visited.forEach((el, i) => {
    if (i !== 0 && el === 0) {
      $q.add(i);
      dp[i] = times[i - 1];
    }
  });

  while ($q.size()) {
    let next = $q.remove();
    for (const el of points[next]) {
      visited[el]--;
      dp[el] = Math.max(dp[el], dp[next] + times[el - 1]);
      if (visited[el] === 0) $q.add(el);
    }
  }

  answer.push(dp[target]);
  index = end + 1;
}

console.log(answer.join("\n"));
