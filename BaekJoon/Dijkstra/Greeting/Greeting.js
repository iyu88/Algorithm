const fs = require("fs");
const [nums, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const MinHeap = function () {
  this.h = [];

  this.swap = (i, j) => {
    const temp = this.h[i];
    this.h[i] = this.h[j];
    this.h[j] = temp;
  };

  this.push = (value) => {
    this.h.push(value);
    this.bubbleUp();
  };

  this.bubbleUp = () => {
    let index = this.h.length - 1;
    let parent = Math.floor((index - 1) / 2);

    while (this.h[parent] !== undefined && this.h[index].w < this.h[parent].w) {
      this.swap(index, parent);
      index = parent;
      parent = Math.floor((index - 1) / 2);
    }
  };

  this.pop = () => {
    if (this.h.length === 0) return null;
    const value = this.h[0];
    this.swap(0, this.h.length - 1);
    this.h.pop();
    this.bubbleDown();
    return value;
  };

  this.bubbleDown = () => {
    let index = 0;
    let left = index * 2 + 1;
    let right = left + 1;

    while (
      this.h[index] !== undefined &&
      ((this.h[left] !== undefined && this.h[left].w < this.h[index].w) ||
        (this.h[right] !== undefined && this.h[right].w < this.h[index].w))
    ) {
      let small = left;
      if (this.h[right] !== undefined && this.h[right].w < this.h[left].w)
        small = right;
      this.swap(index, small);
      index = small;
      left = index * 2 + 1;
      right = left + 1;
    }
  };
};

const [N, M, X, Y] = nums.split(" ").map(Number);
const house = Array.from({ length: N }, () => []);
inputs.forEach((el) => {
  const [from, to, weight] = el.split(" ").map(Number);
  house[from].push({ v: to, w: weight });
  house[to].push({ v: from, w: weight });
});

const dijkstra = (startPoint) => {
  const dist = Array.from({ length: N }, () => Infinity);
  const minHeap = new MinHeap();

  dist[startPoint] = 0;
  minHeap.push({ v: startPoint, w: 0 });

  while (minHeap.h.length) {
    const { v: currentV, w: currentW } = minHeap.pop();
    if (house[currentV].length === 0) continue;
    if (dist[currentV] < currentW) continue;

    for (const next of house[currentV]) {
      const { v: nextV, w: nextW } = next;
      if (dist[nextV] > dist[currentV] + nextW) {
        dist[nextV] = dist[currentV] + nextW;
        minHeap.push({ v: nextV, w: dist[nextV] });
      }
    }
  }

  return dist;
};

let isPossible = true;
let day = 1;
const resultDist = dijkstra(Y);

if (resultDist.includes(Infinity)) {
  isPossible = false;
} else {
  const sortedDist = [
    ...resultDist.slice(0, Y),
    ...resultDist.slice(Y + 1),
  ].sort((a, b) => a - b);
  let moved = 0;

  for (let k = 0; k < sortedDist.length; k++) {
    const d = sortedDist[k];

    if (d * 2 > X) {
      isPossible = false;
      break;
    }

    if (moved + d * 2 <= X) {
      moved += d * 2;
    } else {
      day++;
      moved = d * 2;
    }
  }
}

console.log(isPossible ? day : -1);
