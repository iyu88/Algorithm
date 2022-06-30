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
let answer = [];
let primes = [];
arr = arr.map((el) => el.split(" ").map(Number));

const isPrime = (num) => {
  if (num < 2) return false;
  else {
    for (let k = 2; k <= Math.sqrt(num); k++) {
      if (num % k === 0) return false;
    }
    return true;
  }
};

for (let i = 1000; i < 10000; i++) {
  if (isPrime(i)) primes.push(i);
}

const bfs = (from, to) => {
  let visited = Array(10000).fill(false);
  let $q = new queue();
  let result;
  visited[from] = true;
  $q.add([from, 0]);
  while ($q.size()) {
    let [next, count] = $q.remove();
    if (next === to) {
      result = count;
      break;
    } else {
      let tempArr = next.toString().split("");
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 10; j++) {
          let origin = tempArr[i];
          if (origin !== j) {
            tempArr[i] = j;
            let tempNum = Number(tempArr.join(""));
            if (
              tempNum > 999 &&
              !visited[tempNum] &&
              primes.includes(tempNum)
            ) {
              visited[tempNum] = true;
              $q.add([tempNum, count + 1]);
            }
            tempArr[i] = origin;
          }
        }
      }
    }
  }
  result !== undefined ? answer.push(result) : answer.push("Impossible");
};

while (N--) {
  let [from, to] = arr.shift();
  bfs(from, to);
}

console.log(answer.join("\n"));
