const fs = require("fs");
let [num, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => +el);

const absHeap = function () {
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
    while (parent > 0 && Math.abs(this.h[index]) < Math.abs(this.h[parent])) {
      this.swap(index, parent);
      index = parent;
      parent = Math.floor(index / 2);
    }
  };

  this.pop = () => {
    if (this.h.length === 1) return 0;
    let index, v, p;

    if (this.h[1] > 0) index = this.h.indexOf(-Number(this.h[1]));
    else index = 1;
    if (index === -1) {
      v = this.h[1];
      p = 1;
    } else {
      v = this.h[index];
      p = index;
    }
    this.swap(p, this.h.length - 1);
    this.h.pop();
    this.bubbleDown(p);
    return v;
  };

  this.bubbleDown = (index = 1) => {
    let left = index * 2;
    let right = left + 1;
    let small = index;

    if (!this.h[left] && !this.h[right]) return;
    if (!this.h[right]) {
      if (Math.abs(this.h[left]) < Math.abs(this.h[index])) small = left;
      return;
    }

    if (Math.abs(this.h[right]) < Math.abs(this.h[left])) {
      if (
        right <= this.h.length &&
        Math.abs(this.h[right]) < Math.abs(this.h[index])
      )
        small = right;
    } else {
      if (
        left <= this.h.length &&
        Math.abs(this.h[left]) < Math.abs(this.h[index])
      )
        small = left;
    }

    if (small !== index) {
      this.swap(small, index);
      this.bubbleDown(small);
    }
  };
};

let N = +num;
let answer = [];
let heap = new absHeap();

for (let i = 0; i < N; i++) {
  let next = Number(arr[i]);
  if (!next) {
    if (heap.h.length === 1) answer.push(0);
    else answer.push(heap.pop());
  } else {
    heap.push(next);
  }
}

console.log(answer.join("\n"));
