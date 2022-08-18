const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const queue = function () {
  this.q = {};
  this.front = this.rear = 0;

  this.size = () => {
    if (this.q[this.rear] === undefined) return 0;
    else return this.rear - this.front + 1;
  };

  this.add = (num) => {
    if (!this.size()) this.q["0"] = num;
    else this.q[++this.rear] = num;
  };

  this.remove = () => {
    let v = this.q[this.front];
    delete this.q[this.front];
    if (this.front === this.rear) this.front = this.rear = 0;
    else this.front++;
    return v;
  };
};

let answer = [0, 0, 0];
let [N, M] = nums;
let visited = Array(N).fill(false);
let points = Array(N)
  .fill(null)
  .map((_) => []);
arr.forEach((el) => {
  let [from, to] = el;
  points[from - 1].push(to - 1);
  points[to - 1].push(from - 1);
});
let q = new queue();

visited[0] = true;
q.add([0, 0]);

while (q.size()) {
  let [next, time] = q.remove();
  if (answer[1] < time) {
    answer[0] = next + 1;
    answer[1] = time;
    answer[2] = 1;
  } else if (answer[1] === time) {
    answer[0] = Math.min(answer[0], next + 1);
    answer[2]++;
  }
  for (const el of points[next]) {
    if (!visited[el]) {
      visited[el] = true;
      q.add([el, time + 1]);
    }
  }
}

console.log(answer.join(" "));
