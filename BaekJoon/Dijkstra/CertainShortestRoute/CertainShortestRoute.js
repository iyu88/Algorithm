const fs = require("fs");
let [nums, ...temp] = fs
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

let [N, E] = nums.split(" ").map((el) => +el);
let answer;
let points = Array.from(Array(N), () => []);
let V1, V2;
temp.forEach((el) => {
  let [from, to, weight] = el.split(" ").map((el2) => +el2);
  if (weight) {
    points[from - 1].push({ v: to - 1, w: weight });
    points[to - 1].push({ v: from - 1, w: weight });
  } else {
    V1 = from - 1;
    V2 = to - 1;
  }
});

const dijkstra = (i) => {
  answer = Array(N).fill(Infinity);
  answer[i] = 0;
  let heap = new minHeap();
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
  return answer;
};

let dist1 = dijkstra(0);
let dist2 = dijkstra(V1);
let dist3 = dijkstra(V2);

let case1 = dist1[V1] + dist2[V2] + dist3[N - 1];
let case2 = dist1[V2] + dist2[N - 1] + dist3[V1];

if (case1 == Infinity && case2 == Infinity) {
  console.log(-1);
} else {
  console.log(Math.min(case1, case2));
}
