const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const minHeap = function () {
  this.h = [0];

  this.swap = (i, j) => {
    [this.h[i], this.h[j]] = [this.h[j], this.h[i]];
  };

  this.push = (obj) => {
    this.h.push(obj);
    this.bubbleUp();
  };

  this.bubbleUp = () => {
    let index = this.h.length - 1;
    let parent = Math.floor(index / 2);
    while (parent > 0 && this.h[index].w < this.h[parent].w) {
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
    this.swap(1, this.h.length - 1);
    this.h.pop();
    this.bubbleDown();
    return value;
  };

  this.bubbleDown = (index = 1) => {
    let leftIndex = index * 2;
    let rightIndex = leftIndex + 1;
    let smallIndex = index;

    if (this.h[leftIndex] === undefined && this.h[rightIndex] === undefined)
      return;
    if (this.h[rightIndex] === undefined) {
      if (this.h[leftIndex].w < this.h[index].w) {
        smallIndex = leftIndex;
      }
      return;
    }

    if (this.h[leftIndex].w < this.h[rightIndex].w) {
      if (leftIndex <= this.h.length && this.h[leftIndex].w < this.h[index].w) {
        smallIndex = leftIndex;
      }
    } else {
      if (
        rightIndex <= this.h.length &&
        this.h[rightIndex].w < this.h[index].w
      ) {
        smallIndex = rightIndex;
      }
    }

    if (smallIndex !== index) {
      this.swap(index, smallIndex);
      this.bubbleDown(smallIndex);
    }
  };
};

let [N, M, K, X] = nums.split(" ").map((el) => +el);
let answer = Array(N).fill(Infinity);
let points = Array.from(Array(N), () => []);
arr.forEach((el) => {
  let [from, to] = el.split(" ").map((el2) => +el2);
  points[from - 1].push({ v: to - 1, w: 1 });
});

let heap = new minHeap();

const dijkstra = () => {
  answer[X - 1] = 0;
  heap.push({ v: X - 1, w: answer[X - 1] });
  while (heap.h.length !== 1) {
    let { v: startV, w: startW } = heap.pop();
    if (answer[startV] < startW) continue;
    if (!points[startV].length) continue;
    for (const el of points[startV]) {
      let { v: nextV, w: nextW } = el;
      if (answer[startV] + nextW < answer[nextV]) {
        answer[nextV] = answer[startV] + nextW;
        heap.push({ v: nextV, w: answer[nextV] });
      }
    }
  }
};

dijkstra();

let log = [];
answer.forEach((el, index) => (el === K ? log.push(index + 1) : ""));
console.log(log.length ? log.join("\n") : -1);
