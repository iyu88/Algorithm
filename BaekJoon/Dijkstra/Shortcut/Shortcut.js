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
    if (this.h.length === 1) return 0;
    let v = this.h[1];
    this.swap(1, this.h.length - 1);
    this.h.pop();
    this.bubbleDown();
    return v;
  };

  this.bubbleDown = (index = 1) => {
    let left = index * 2;
    let right = left + 1;
    let small = index;
    if (!this.h[left] && !this.h[right]) return;
    if (!this.h[right]) {
      if (this.h[left].w < this.h[index].w) small = left;
      return;
    }

    if (this.h[left].w < this.h[right].w) {
      if (left <= this.h.length && this.h[left].w < this.h[index].w)
        small = left;
    } else {
      if (right <= this.h.length && this.h[right].w < this.h[index].w)
        small = right;
    }

    if (small !== index) {
      this.swap(index, small);
      this.bubbleDown(small);
    }
  };
};

let [N, D] = nums.split(" ").map((el) => +el);
let result = [];
let points = {};
arr.forEach((el) => {
  let [from, to, dist] = el.split(" ").map((el2) => +el2);
  if (to <= D && to - from > dist) {
    if (!points[from]) points[from] = [];
    points[from].push({ v: to, w: dist });
  }
});

const dijkstra = () => {
  let heap = new minHeap();
  let answer = Array(D + 1).fill(Infinity);
  answer[0] = 0;
  heap.push({ v: 0, w: answer[0] });
  while (heap.h.length !== 1) {
    let { v: startV, w: startW } = heap.pop();
    if (startV === D) {
      result.push(startW);
      continue;
    }
    if (answer[startV] < startW) continue;
    if (points[startV] !== undefined) {
      for (const el of points[startV]) {
        let { v: nextV, w: nextW } = el;
        if (answer[nextV] > answer[startV] + nextW) {
          answer[nextV] = answer[startV] + nextW;
          heap.push({ v: nextV, w: answer[nextV] });
        }
      }
    }
    if (startV + 1 <= D) {
      answer[startV + 1] = Math.min(answer[startV + 1], answer[startV] + 1);
      heap.push({ v: startV + 1, w: answer[startV + 1] });
    }
  }
};

dijkstra();

console.log(Math.min(...result));
