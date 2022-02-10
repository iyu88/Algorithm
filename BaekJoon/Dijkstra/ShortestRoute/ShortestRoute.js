const fs = require("fs");
let [nums, start, ...arr] = fs
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
    this.bubbleDown(1);
    return value;
  };

  this.bubbleDown = (index) => {
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

    if (this.h[leftIndex].w > this.h[rightIndex].w) {
      if (
        rightIndex <= this.h.length &&
        this.h[rightIndex].w < this.h[index].w
      ) {
        smallIndex = rightIndex;
      }
    } else {
      if (leftIndex <= this.h.length && this.h[leftIndex].w < this.h[index].w) {
        smallIndex = leftIndex;
      }
    }

    if (smallIndex !== index) {
      this.swap(index, smallIndex);
      this.bubbleDown(smallIndex);
    }
  };
};

let [V, E] = nums.split(" ").map((el) => +el);
let S = start - 1;
let answer = Array(V).fill(Infinity);
let points = Array.from(Array(V), () => []);
arr.forEach((el) => {
  let [from, to, weight] = el.split(" ").map((el2) => +el2);
  points[from - 1].push([to - 1, weight]);
});
let heap = new minHeap();

const dijkstra = () => {
  answer[S] = 0;
  heap.push({ v: S, w: answer[S] });
  while (heap.h.length !== 1) {
    let { v, w } = heap.pop();
    if (!points[v].length) continue;
    if (answer[v] < w) continue;
    for (const el of points[v]) {
      let [to, weight] = el;
      if (answer[to] > answer[v] + weight) {
        answer[to] = answer[v] + weight;
        heap.push({ v: to, w: answer[to] });
      }
    }
  }
};

dijkstra();

console.log(answer.map((el) => (el === Infinity ? "INF" : el)).join("\n"));
