const fs = require("fs");
let [num, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => +el);

let answer = [];

function maxHeap() {
  this.h = [0];

  this.swap = (i, j) => {
    let temp = this.h[i];
    this.h[i] = this.h[j];
    this.h[j] = temp;
  };

  this.bubbleDown = () => {
    let index = 1;
    let leftChild = index * 2;
    let rightChild = index * 2 + 1;
    while (
      this.h[leftChild] !== undefined &&
      (this.h[index] < this.h[leftChild] || this.h[index] < this.h[rightChild])
    ) {
      let bigChild = leftChild;
      if (
        this.h[rightChild] !== undefined &&
        this.h[leftChild] < this.h[rightChild]
      ) {
        bigChild = rightChild;
      }
      this.swap(index, bigChild);
      index = bigChild;
      leftChild = index * 2;
      rightChild = index * 2 + 1;
    }
  };

  this.bubbleUp = () => {
    let index = this.h.length - 1;
    let parent = Math.floor(index / 2);
    while (parent > 0 && this.h[parent] < this.h[index]) {
      this.swap(index, parent);
      index = parent;
      parent = Math.floor(index / 2);
    }
  };

  this.pop = () => {
    if (this.h.length === 1) {
      return 0;
    }
    let value = this.h[1];
    this.h[1] = this.h[this.h.length - 1];
    this.h.pop();
    this.bubbleDown();
    return value;
  };

  this.push = (num) => {
    this.h.push(num);
    this.bubbleUp();
  };
}

let heap = new maxHeap();

for (let [index, el] of arr.entries()) {
  if (el === 0) {
    answer.push(heap.pop());
  } else {
    heap.push(el);
  }
}

console.log(answer.join("\n"));
