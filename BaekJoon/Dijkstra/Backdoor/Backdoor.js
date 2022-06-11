const fs = require("fs");
let [nums, vision, ...arr] = fs
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
      this.h[left] !== undefined &&
      this.h[index] !== undefined &&
      (this.h[left].w < this.h[index].w ||
        (this.h[right] !== undefined && this.h[right].w < this.h[index].w))
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

let [N, M] = nums.split(" ").map(Number);
let V = vision.split(" ").map(Number);
let answer = Array(N).fill(Infinity);
let points = Array(N)
  .fill(null)
  .map((el) => []);
arr.forEach((el) => {
  let [from, to, weight] = el.split(" ").map(Number);
  points[from].push({ v: to, w: weight });
  points[to].push({ v: from, w: weight });
});

let heap = new minHeap();
answer[0] = 0;
heap.push({ v: 0, w: 0 });

while (heap.h.length !== 1) {
  let { v: startV, w: startW } = heap.pop();
  if (!points[startV].length) continue;
  if (answer[startV] < startW) continue;
  if (V[startV] && startV !== N - 1) continue;
  for (const el of points[startV]) {
    let { v: nextV, w: nextW } = el;
    if (answer[nextV] > answer[startV] + nextW) {
      answer[nextV] = answer[startV] + nextW;
      heap.push({ v: nextV, w: answer[nextV] });
    }
  }
}

console.log(answer[N - 1] === Infinity ? -1 : answer[N - 1]);
