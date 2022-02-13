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
    let left = index * 2;
    let right = left + 1;
    let smallIndex = index;
    if (this.h[left] === undefined && this.h[right] === undefined) return;
    if (this.h[right] === undefined) {
      if (this.h[left].w < this.h[index].w) {
        smallIndex = left;
      }
      return;
    }

    if (this.h[left].w < this.h[right].w) {
      if (left <= this.h.length && this.h[left].w < this.h[index].w)
        smallIndex = left;
    } else {
      if (right <= this.h.length && this.h[right].w < this.h[index].w)
        smallIndex = right;
    }

    if (smallIndex !== index) {
      this.swap(index, smallIndex);
      this.bubbleDown(smallIndex);
    }
  };
};

let answer = Array(Number(N)).fill(Infinity);
let routes = Array(Number(N));
let points = Array.from(Array(Number(N)), () => []);
let F, T;
arr.forEach((el) => {
  let [from, to, weight] = el.split(" ").map((el) => +el);
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
  heap.push({ v: F, w: answer[F], r: [F] });
  while (heap.h.length !== 1) {
    let { v: startV, w: startW, r: startR } = heap.pop();
    if (!points[startV].length) continue;
    if (answer[startV] < startW) continue;
    for (const el of points[startV]) {
      let { v: nextV, w: nextW } = el;
      if (answer[nextV] > answer[startV] + nextW) {
        answer[nextV] = answer[startV] + nextW;
        routes[nextV] = [...startR, nextV];
        heap.push({ v: nextV, w: answer[nextV], r: routes[nextV] });
      }
    }
  }
};

dijkstra();

console.log(answer[T]);
console.log(routes[T].length);
console.log(routes[T].map((el) => el + 1).join(" "));
