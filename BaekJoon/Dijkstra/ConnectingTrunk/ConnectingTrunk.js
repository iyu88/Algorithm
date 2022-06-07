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
    if (this.h.length === 1) return null;
    let value = this.h[1];
    this.swap(1, this.h.length - 1);
    this.h.pop();
    this.bubbleDown();
    return value;
  };

  this.bubbleDown = () => {
    let index = 1;
    let left = index * 2;
    let right = left + 1;
    while (
      this.h[left] !== undefined &&
      ((this.h[left] !== undefined &&
        this.h[index] !== undefined &&
        this.h[left].w < this.h[index].w) ||
        (this.h[right] !== undefined &&
          this.h[index] !== undefined &&
          this.h[right].w < this.h[index].w))
    ) {
      let small = left;
      if (this.h[right] !== undefined && this.h[right].w < this.h[left].w)
        small = right;
      this.swap(index, small);
      index = small;
      left = index * 2;
      right = left + 1;
    }
  };
};

let [N, M] = nums.split(" ").map((el) => +el);
let answer = Array(N).fill(Infinity);
let points = Array(N)
  .fill(null)
  .map((el) => []);
let S, E;
arr.forEach((el) => {
  let [from, to, weight] = el.split(" ").map(Number);
  if (weight === undefined) [S, E] = [from - 1, to - 1];
  else {
    points[from - 1].push({ v: to - 1, w: weight });
    points[to - 1].push({ v: from - 1, w: weight });
  }
});
let heap = new minHeap();

const dijkstra = (i) => {
  answer[i] = 0;
  heap.push({ v: i, w: 0 });
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

dijkstra(S);

console.log(answer[E]);
