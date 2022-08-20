const fs = require("fs");
let [t, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

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

const calcDist = (a, b, c, d) => {
  return Math.abs(a - c) + Math.abs(b - d);
};

let answer = [];
let index = 0;

while (t--) {
  let N = Number(arr[index++]);
  let [startX, startY] = arr[index++].split(" ").map(Number);
  let visited = Array(N).fill(false);
  let cases = arr
    .slice(index, index + N)
    .map((el) => el.split(" ").map(Number));
  index += N;
  let [destX, destY] = arr[index++].split(" ").map(Number);
  let result;
  let q = new queue();

  q.add([startX, startY]);

  while (q.size()) {
    let [currX, currY] = q.remove();
    if (calcDist(currX, currY, destX, destY) <= 1000) {
      result = "happy";
      break;
    }
    for (let i = 0; i < N; i++) {
      if (visited[i]) continue;
      let [nextX, nextY] = cases[i].map(Number);
      if (calcDist(currX, currY, nextX, nextY) <= 1000) {
        visited[i] = true;
        q.add([nextX, nextY]);
      }
    }
  }
  answer.push(result ? result : "sad");
}

console.log(answer.join("\n"));
