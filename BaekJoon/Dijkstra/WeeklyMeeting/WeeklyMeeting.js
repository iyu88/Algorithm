const fs = require("fs");
const [counts, destinations, startings, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const minHeap = function () {
  this.h = [0];

  this.swap = (i, j) => {
    [this.h[i], this.h[j]] = [this.h[j], this.h[i]];
  };

  this.push = (value) => {
    this.h.push(value);
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
    if (this.h.length === 1) return;
    const value = this.h[1];
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

const [N, V, E] = counts;
const [A, B] = destinations;
const points = Array(V + 1)
  .fill(null)
  .map((el) => []);
arr.forEach(([from, to, weight]) => {
  points[from].push({ v: to, w: weight });
  points[to].push({ v: from, w: weight });
});

const dijkstra = (target) => {
  const heap = new minHeap();
  const answer = Array(V + 1).fill(Infinity);
  answer[target] = 0;
  heap.push({ v: target, w: answer[target] });
  while (heap.h.length !== 1) {
    const { v: startV, w: startW } = heap.pop();
    if (!points[startV].length) continue;
    if (answer[startV] < startW) continue;
    for (const el of points[startV]) {
      const { v: nextV, w: nextW } = el;
      if (answer[nextV] > answer[startV] + nextW) {
        answer[nextV] = answer[startV] + nextW;
        heap.push({ v: nextV, w: answer[nextV] });
      }
    }
  }
  return (
    (answer[A] === Infinity ? -1 : answer[A]) +
    (answer[B] === Infinity ? -1 : answer[B])
  );
};

console.log(startings.map(dijkstra).reduce((acc, cur) => acc + cur, 0));
