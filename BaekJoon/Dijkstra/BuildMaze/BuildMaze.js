const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

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

let N = +num;
let result = [];
let answer = Array(N)
  .fill(null)
  .map((el) => Array(N).fill(Infinity));
let $map = arr.map((el) => el.split("").map((el2) => (+el2 === 0 ? 1 : 0)));
let dy = [-1, 0, 1, 0];
let dx = [0, -1, 0, 1];

const dijkstra = () => {
  let heap = new minHeap();
  answer[0][0] = 0;
  heap.push({ v: [0, 0], w: answer[0][0] });
  while (heap.h.length !== 1) {
    let { v: startV, w: startW } = heap.pop();
    let [startY, startX] = startV;
    if (startY === N - 1 && startX === N - 1) result.push(startW);
    else {
      for (let k = 0; k < dy.length; k++) {
        let dyy = dy[k] + startY;
        let dxx = dx[k] + startX;
        if (dyy > -1 && dxx > -1 && dyy < N && dxx < N) {
          if (answer[dyy][dxx] > answer[startY][startX] + $map[dyy][dxx]) {
            answer[dyy][dxx] = answer[startY][startX] + $map[dyy][dxx];
            heap.push({ v: [dyy, dxx], w: answer[dyy][dxx] });
          }
        }
      }
    }
  }
};

dijkstra();

console.log(Math.min(...result));
