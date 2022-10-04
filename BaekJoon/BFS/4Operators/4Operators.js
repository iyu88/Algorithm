const fs = require("fs");
let [N, M] = fs
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

const q = new queue();
let answer = [];
let visited = [];
q.add([N, ""]);
visited.push(N);

if (N === M) {
  console.log(0);
} else {
  while (q.size()) {
    let [next, history] = q.remove();
    if (next === M) {
      answer.push(history);
      break;
    }
    let added = next + next;
    let subtracted = next - next;
    let multiplied = next * next;
    let divided = next / next;

    if (!visited.includes(multiplied) && multiplied <= M) {
      visited.push(multiplied);
      q.add([multiplied, history + "*"]);
    }

    if (!visited.includes(added) && added <= M) {
      visited.push(added);
      q.add([added, history + "+"]);
    }

    if (!visited.includes(subtracted)) {
      visited.push(subtracted);
      q.add([subtracted, history + "-"]);
    }

    if (!visited.includes(divided) && next) {
      visited.push(divided);
      q.add([divided, history + "/"]);
    }
  }

  console.log(!answer.length ? -1 : answer[0]);
}
