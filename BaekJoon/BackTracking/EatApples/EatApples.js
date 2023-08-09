const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = 5;
const board = inputs.slice(0, N).map((el) => el.split(" ").map(Number));
const visited = inputs.slice(0, N).map((el) => el.split(" ").map(Number));
const [Y, X] = inputs[N].split(" ").map(Number);
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];
let answer = 0;

const backTracking = (y, x, c, a) => {
  if (c <= 3 && a === 2) {
    answer = 1;
    return;
  } else {
    for (let k = 0; k < 4; k++) {
      const dyy = DY[k] + y;
      const dxx = DX[k] + x;

      if (dyy < 0 || dxx < 0 || dyy >= N || dxx >= N) continue;
      if (visited[dyy][dxx] === -1) continue;

      const currentValue = visited[dyy][dxx];

      visited[dyy][dxx] = -1;

      backTracking(dyy, dxx, c + 1, currentValue === 1 ? a + 1 : a);

      visited[dyy][dxx] = currentValue;
    }
  }
};

let apple = 0;
if (visited[Y][X] === 1) apple++;
visited[Y][X] = -1;

backTracking(Y, X, 0, apple);

console.log(answer);
