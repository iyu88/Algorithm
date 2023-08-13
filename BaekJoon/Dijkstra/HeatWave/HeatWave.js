const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const MinHeap = function () {
  this.h = [];

  this.size = () => this.h.length;

  this.swap = (i, j) => {
    const temp = this.h[i];
    this.h[i] = this.h[j];
    this.h[j] = temp;
  };

  this.add = (value) => {
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

  this.remove = () => {
    if (this.size() === 0) return null;
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

const [T, C, Ts, Te] = inputs[0].split(" ").map(Number);
const connections = Array(T + 1)
  .fill(null)
  .map((_) => []);

for (let i = 1; i <= C; i++) {
  const [from, to, weight] = inputs[i].split(" ").map(Number);
  connections[from].push({ v: to, w: weight });
  connections[to].push({ v: from, w: weight });
}

const dijkstra = (from, to) => {
  const answer = Array.from({ length: T + 1 }, () => Infinity);
  const minHeap = new MinHeap();

  answer[from] = 0;
  minHeap.add({ v: from, w: 0 });

  while (minHeap.h.length) {
    const { v: currentV, w: currentW } = minHeap.remove();
    if (!connections[currentV]) continue;
    if (answer[currentV] < currentW) continue;

    for (const next of connections[currentV]) {
      const { v: nextV, w: nextW } = next;
      if (answer[nextV] > answer[currentV] + nextW) {
        answer[nextV] = answer[currentV] + nextW;
        minHeap.add({ v: nextV, w: answer[nextV] });
      }
    }
  }

  return answer[to];
};

const answer = dijkstra(Ts, Te);

console.log(answer);
