const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

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

  this.getFront = () => (this.size() ? this.q[this.front] : -1);

  this.getRear = () => (this.size() ? this.q[this.rear] : -1);
};

let N = +num;
let answer = [];
let q = new queue();

for (let i = 0; i < N; i++) {
  let next = arr[i].split(" ");
  switch (next[0]) {
    case "push":
      q.add(Number(next[1]));
      break;
    case "pop":
      q.size() ? answer.push(q.remove()) : answer.push(-1);
      break;
    case "size":
      answer.push(q.size());
      break;
    case "empty":
      q.size() ? answer.push(0) : answer.push(1);
      break;
    case "front":
      answer.push(q.getFront());
      break;
    case "back":
      answer.push(q.getRear());
      break;
  }
}

console.log(answer.join("\n"));
