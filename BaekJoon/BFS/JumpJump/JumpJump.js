const fs = require("fs");
let [num, arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

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

let N = +num;
arr = arr.split(" ").map(Number);
let visited = Array(N).fill(false);
let q = new queue();

const bfs = () => {
  q.add([0, 0]);
  visited[0] = true;
  while (q.size()) {
    let [x, time] = q.remove();
    if (x === N - 1) {
      answer = time;
      break;
    }
    if (arr[x]) {
      for (let k = 1; k <= arr[x]; k++) {
        let dxx = x + k;
        if (dxx < N && !visited[dxx]) {
          visited[dxx] = true;
          q.add([dxx, time + 1]);
        }
      }
    }
  }
};

bfs();

if (visited[N - 1] === false) console.log(-1);
else console.log(answer);
