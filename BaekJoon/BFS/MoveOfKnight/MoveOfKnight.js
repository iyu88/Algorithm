const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

class queue {
  constructor() {
    this.q = {};
    this.front = this.rear = 0;
  }

  size() {
    if (this.q[this.rear] === undefined) return 0;
    else return this.rear - this.front + 1;
  }

  add(num) {
    if (!this.size()) this.q["0"] = num;
    else {
      this.rear++;
      this.q[this.rear] = num;
    }
  }

  remove() {
    let v = this.q[this.front];
    delete this.q[this.front];
    if (this.front === this.rear) this.front = this.rear = 0;
    else this.front++;
    return v;
  }
}

let N = +num;
let answer = [];
let result;
let visited;
let dy = [-1, -2, -2, -1, 1, 2, 2, 1];
let dx = [-2, -1, 1, 2, 2, 1, -1, -2];

for (let i = 0; i < arr.length; i += 3) {
  result = 0;
  let M = Number(arr[i]);
  visited = Array(M)
    .fill(null)
    .map((el) => Array(M).fill(false));
  let [curY, curX] = arr[i + 1].split(" ").map(Number);
  let [tarY, tarX] = arr[i + 2].split(" ").map(Number);
  let Q = new queue();
  visited[curY][curX] = true;
  Q.add([curY, curX, 0]);

  while (Q.size()) {
    let [y, x, count] = Q.remove();
    if (y === tarY && x === tarX) {
      result = count;
      break;
    }
    for (let k = 0; k < 8; k++) {
      let dyy = dy[k] + y;
      let dxx = dx[k] + x;
      if (dyy > -1 && dyy < M && dxx > -1 && dxx < M && !visited[dyy][dxx]) {
        visited[dyy][dxx] = true;
        Q.add([dyy, dxx, count + 1]);
      }
    }
  }
  answer.push(result);
}

console.log(answer.join("\n"));
