const fs = require("fs");
let [sizes, nums, ...arr] = fs
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
      this.h[index] &&
      ((this.h[left] && this.h[left].w < this.h[index].w) ||
        (this.h[right] && this.h[right].w < this.h[index].w))
    ) {
      let small = left;
      if (this.h[right] && this.h[right].w < this.h[left].w) small = right;
      this.swap(index, small);
      index = small;
      left = index * 2;
      right = left + 1;
    }
  };
};

let [N, M] = sizes.split(" ").map(Number);
let [y1, x1, y2, x2] = nums.split(" ").map((el) => Number(el) - 1);
let answer = Array(N)
  .fill(null)
  .map((el) => Array(M).fill(Infinity));
arr = arr.map((el) => el.split(""));
let dy = [-1, 1, 0, 0];
let dx = [0, 0, -1, 1];

const dijkstra = () => {
  let heap = new minHeap();
  answer[y1][x1] = 0;
  heap.push({ v: [y1, x1], w: 0 });
  while (heap.h.length !== 1) {
    let { v: startV, w: startW } = heap.pop();
    let [startY, startX] = startV;
    for (let k = 0; k < 4; k++) {
      let dyy = dy[k] + startY;
      let dxx = dx[k] + startX;
      if (dyy > -1 && dyy < N && dxx > -1 && dxx < M) {
        let v;
        if (arr[dyy][dxx] == 0) v = 0;
        else v = 1;
        if (Number(answer[dyy][dxx]) > Number(answer[startY][startX]) + v) {
          answer[dyy][dxx] = Number(answer[startY][startX]) + v;
          heap.push({ v: [dyy, dxx], w: answer[dyy][dxx] });
        }
      }
    }
  }
};

dijkstra();
console.log(answer[y2][x2]);
