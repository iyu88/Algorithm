const fs = require("fs");
const [nums, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const Queue = function () {
  this.q = {};
  this.front = this.rear = this.length = 0;

  this.add = (value) => {
    if (this.length === 0) this.q[this.rear] = value;
    else this.q[++this.rear] = value;
    this.length++;
  };

  this.remove = () => {
    const value = this.q[this.front];
    delete this.q[this.front];
    if (this.front !== this.rear) this.front++;
    this.length--;
    return value;
  };
};

const [K, N, M] = nums.split(" ").map(Number);
const cows = inputs.slice(0, K).map(Number);
const connections = Array.from({ length: M + 1 }, () => []);
inputs.slice(K, K + M).forEach((el) => {
  const [from, to] = el.split(" ").map(Number);
  connections[from].push(to);
});
const counts = [];

const bfs = (x) => {
  const pastures = Array(N + 1).fill(false);
  const Q = new Queue();

  pastures[x] = true;
  Q.add(x);

  while (Q.length) {
    const current = Q.remove();

    for (let next of connections[current]) {
      if (pastures[next] === false) {
        pastures[next] = true;
        if (counts[next] === false) counts[next] = true;
        Q.add(next);
      }
    }
  }

  return pastures;
};

cows.forEach((cow) => counts.push(bfs(cow)));

let answer = 0;

for (let i = 1; i <= N; i++) {
  let flag = true;
  for (let j = 0; j < K; j++) {
    if (counts[j][i] === false) {
      flag = false;
      break;
    }
  }
  if (flag) answer++;
}

console.log(answer);
