const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const minHeap = function () {
  this.h = [0];

  this.swap = (i, j) => {
    [this.h[i], this.h[j]] = [this.h[j], this.h[i]];
  };

  this.push = (num) => {
    this.h.push(num);
    this.bubbleUp();
  };

  this.bubbleUp = () => {
    let index = this.h.length - 1;
    let parent = Math.floor(index / 2);
    while (parent > 0 && this.h[index] < this.h[parent]) {
      this.swap(index, parent);
      index = parent;
      parent = Math.floor(index / 2);
    }
  };

  this.pop = () => {
    if (this.h.length === 1) return null;
    let v = this.h[1];
    this.swap(1, this.h.length - 1);
    this.h.pop();
    this.bubbleDown();
    return v;
  };

  this.bubbleDown = () => {
    let index = 1;
    let left = index * 2;
    let right = left + 1;
    while (
      this.h[index] &&
      ((this.h[left] && this.h[left] < this.h[index]) ||
        (this.h[right] && this.h[right] < this.h[index]))
    ) {
      let small = left;
      if (this.h[right] && this.h[right] < this.h[left]) small = right;
      this.swap(index, small);
      index = small;
      left = index * 2;
      right = left + 1;
    }
  };
};

let answer = [];
let [N, M] = nums;
let visited = Array(N).fill(0);
let points = Array(N)
  .fill(null)
  .map((el) => []);
arr.forEach((el) => {
  let [pre, sub] = el;
  points[pre - 1].push(sub - 1);
  visited[sub - 1]++;
});

let heap = new minHeap();
for (let i = 0; i < N; i++) {
  if (!visited[i]) heap.push(i);
}

while (heap.h.length !== 1) {
  let next = heap.pop();
  answer.push(next + 1);
  for (const el of points[next]) {
    visited[el]--;
    if (!visited[el]) heap.push(el);
  }
}

console.log(answer.join(" "));
