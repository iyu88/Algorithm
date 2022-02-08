const fs = require("fs");
let [num, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => +el);

let answer = [];

function minHeap() {
  this.heap = [0];

  this.swap = (i, j) => {
    let temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  };

  this.bubbleDown = () => {
    let index = 1;
    while (
      this.heap[index * 2] !== undefined &&
      (this.heap[index * 2] < this.heap[index] ||
        this.heap[index * 2 + 1] < this.heap[index])
    ) {
      let smallChild = index * 2;
      if (
        this.heap[index * 2 + 1] !== undefined &&
        this.heap[index * 2 + 1] < this.heap[index * 2]
      ) {
        smallChild = index * 2 + 1;
      }
      this.swap(index, smallChild);
      index = smallChild;
    }
  };

  this.bubbleUp = () => {
    let index = this.heap.length - 1;
    while (
      Math.floor(index / 2) > 0 &&
      this.heap[index] < this.heap[Math.floor(index / 2)]
    ) {
      this.swap(index, Math.floor(index / 2));
      index = Math.floor(index / 2);
    }
  };

  this.pop = () => {
    if (this.heap.length === 1) {
      return 0;
    }
    let value = this.heap[1];
    this.heap[1] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.bubbleDown();
    return value;
  };

  this.push = (num) => {
    this.heap.push(num);
    this.bubbleUp();
  };
}

let heap = new minHeap();

for (let [index, el] of arr.entries()) {
  if (el === 0) {
    answer.push(heap.pop());
  } else {
    heap.push(el);
  }
}

console.log(answer.join("\n"));
