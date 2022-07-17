const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const maxHeap = function () {
  this.h = [0];

  this.swap = (i, j) => {
    [this.h[i], this.h[j]] = [this.h[j], this.h[i]];
  };

  this.add = (obj) => {
    this.h.push(obj);
    this.bubbleUp();
  };

  this.bubbleUp = () => {
    let index = this.h.length - 1;
    let parent = Math.floor(index / 2);
    while (parent > 0 && this.h[index] > this.h[parent]) {
      this.swap(index, parent);
      index = parent;
      parent = Math.floor(index / 2);
    }
  };

  this.remove = () => {
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
      this.h[index] !== undefined &&
      ((this.h[left] !== undefined && this.h[index] < this.h[left]) ||
        (this.h[right] !== undefined && this.h[index] < this.h[right]))
    ) {
      let big = left;
      if (this.h[right] !== undefined && this.h[right] > this.h[left])
        big = right;
      this.swap(index, big);
      index = big;
      left = index * 2;
      right = left + 1;
    }
  };
};

let [N, K] = nums.split(" ").map(Number);
let answer = 0;
let MV = arr
  .splice(0, N)
  .map((el) => el.split(" ").map(Number))
  .sort((a, b) => a[0] - b[0]);
let C = arr.map(Number).sort((a, b) => a - b);
let heap = new maxHeap();

let j = 0;
for (let i = 0; i < K; i++) {
  while (j < N && MV[j][0] <= C[i]) {
    // 가장 가벼운 보석부터 가방의 용량과 비교해서 가능할 경우
    heap.add(MV[j][1]);
    j++;
  }
  if (heap.h.length !== 1) {
    answer += heap.remove();
  }
}

console.log(answer);
