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
    while (parent > 0 && this.h[index].n < this.h[parent].n) {
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
      ((this.h[left] && this.h[left].n < this.h[index].n) ||
        (this.h[right] && this.h[right].n < this.h[index].n))
    ) {
      let small = left;
      if (this.h[right] && this.h[right].n < this.h[left].n) small = right;
      this.swap(index, small);
      index = small;
      left = index * 2;
      right = left + 1;
    }
  };
};

let [N, K] = nums.split(" ").map(Number);
arr = arr.map((el) => el.split(" ").map(Number));
let [S, Y, X] = arr.pop();
let dy = [-1, 1, 0, 0];
let dx = [0, 0, -1, 1];
let visited = Array(N)
  .fill(null)
  .map((el) => Array(N).fill(false));
let heap = new minHeap();
let points = [];
let zero = 0;

const bfs = () => {
  while (heap.h.length !== 1) {
    let { n: nextN, v: nextV } = heap.pop();
    let [nextY, nextX] = nextV;
    for (let k = 0; k < 4; k++) {
      let dyy = dy[k] + nextY;
      let dxx = dx[k] + nextX;
      if (
        dyy > -1 &&
        dyy < N &&
        dxx > -1 &&
        dxx < N &&
        !visited[dyy][dxx] &&
        !arr[dyy][dxx]
      ) {
        visited[dyy][dxx] = true;
        arr[dyy][dxx] = nextN;
        zero--;
        points.push({ n: nextN, v: [dyy, dxx] });
      }
    }
  }
};

while (S--) {
  if (points.length === 0) {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (arr[y][x]) {
          visited[y][x] = true;
          heap.push({ n: arr[y][x], v: [y, x] });
        } else zero++;
      }
    }
  } else {
    points.forEach((el) => heap.push(el));
    points = [];
  }
  bfs();
  if (zero === 0) break;
}

console.log(arr[Y - 1][X - 1]);
