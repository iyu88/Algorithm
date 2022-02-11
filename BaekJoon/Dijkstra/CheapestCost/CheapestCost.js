const fs = require("fs");
let [N, M, ...arr] = fs
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
    if (this.h.length === 1) return 0;
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

let answer = Array(Number(N)).fill(Infinity);
let points = Array.from(Array(Number(N)), () => []);
let F, T;
arr.forEach((el) => {
  let [from, to, weight] = el.split(" ").map((el2) => +el2);
  if (weight !== undefined) {
    points[from - 1].push({ v: to - 1, w: weight });
  } else {
    F = from - 1;
    T = to - 1;
  }
});

let heap = new minHeap();

const dijkstra = () => {
  answer[F] = 0;
  heap.push({ v: F, w: answer[F] });
  while (heap.h.length !== 1) {
    let { v: startV, w: startW } = heap.pop();
    if (!points[startV].length) continue;
    if (answer[startV] < startW) continue;
    for (const el of points[startV]) {
      let { v: nextV, w: nextW } = el;
      if (answer[nextV] > answer[startV] + nextW) {
        answer[nextV] = answer[startV] + nextW;
        heap.push({ v: nextV, w: answer[nextV] });
      }
    }
  }
};

dijkstra();
console.log(answer[T]);
