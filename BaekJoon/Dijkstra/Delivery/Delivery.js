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

let [N, M] = nums.split(" ").map((el) => +el);
let result = Array(N)
  .fill(null)
  .map((el) => Array(N).fill("-"));
let answer = Array(N)
  .fill(null)
  .map((el) => Array(N).fill(Infinity));
let points = Array(N)
  .fill(null)
  .map((el) => []);
arr.forEach((el) => {
  let [from, to, weight] = el.split(" ").map((el2) => +el2);
  points[from - 1].push({ v: to - 1, w: weight });
  points[to - 1].push({ v: from - 1, w: weight });
});

const dijkstra = () => {
  let heap = new minHeap();
  for (let k = 0; k < N; k++) {
    answer[k][k] = 0;
    heap.push({ v: k, w: answer[k][k], r: [k] });
    while (heap.h.length !== 1) {
      let { v: startV, w: startW, r: startR } = heap.pop();
      if (answer[k][startV] < startW) continue;
      if (!points[startV].length) continue;
      for (const el of points[startV]) {
        let { v: nextV, w: nextW } = el;
        if (answer[k][nextV] > answer[k][startV] + nextW) {
          answer[k][nextV] = answer[k][startV] + nextW;
          let nextR = [...startR, nextV];
          if (nextR.length >= 2) result[k][nextV] = nextR[1] + 1;
          heap.push({ v: nextV, w: answer[k][nextV], r: nextR });
        }
      }
    }
  }
};

dijkstra();

console.log(result.map((el) => el.join(" ")).join("\n"));
