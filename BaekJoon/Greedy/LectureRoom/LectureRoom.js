const fs = require("fs");
const [_, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const MinHeap = function () {
  this.h = [];

  this.swap = (i, j) => {
    const temp = this.h[i];
    this.h[i] = this.h[j];
    this.h[j] = temp;
  };

  this.push = (value) => {
    this.h.push(value);
    this.bubbleUp();
  };

  this.bubbleUp = () => {
    let index = this.h.length - 1;
    let parent = Math.floor((index - 1) / 2);

    while (this.h[parent] !== undefined && this.h[index] < this.h[parent]) {
      this.swap(index, parent);
      index = parent;
      parent = Math.floor((index - 1) / 2);
    }
  };

  this.pop = () => {
    const value = this.h[0];
    this.swap(0, this.h.length - 1);
    this.h.pop();
    this.bubbleDown();
    return value;
  };

  this.bubbleDown = () => {
    let index = 0;
    let left = index * 2 + 1;
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
      left = index * 2 + 1;
      right = left + 1;
    }
  };
};

const minHeap = new MinHeap();
const sorted = inputs
  .map((el) => el.split(" ").map(Number))
  .sort((a, b) => a[1] - b[1]);
let count = 0;

sorted.forEach((el) => {
  const [_, start, end] = el;

  if (minHeap.h.length && start >= minHeap.h[0]) {
    minHeap.pop();
  }

  minHeap.push(end);

  count = Math.max(count, minHeap.h.length);
});

console.log(count);
