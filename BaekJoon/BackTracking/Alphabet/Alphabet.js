const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [R, C] = nums.split(" ").map((el) => +el);
let answer = 0;
let visited = Array(26).fill(false);
let $map = arr.map((el) => el.split(""));

let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

const dfs = (y, x, count) => {
  answer = Math.max(answer, count);
  for (let k = 0; k < dy.length; k++) {
    let dyy = dy[k] + y;
    let dxx = dx[k] + x;
    if (
      dyy > -1 &&
      dxx > -1 &&
      dyy < R &&
      dxx < C &&
      !visited[$map[dyy][dxx].charCodeAt() - 65]
    ) {
      visited[$map[dyy][dxx].charCodeAt() - 65] = true;
      dfs(dyy, dxx, count + 1);
      visited[$map[dyy][dxx].charCodeAt() - 65] = false;
    }
  }
};

visited[$map[0][0].charCodeAt() - 65] = true;
dfs(0, 0, 1);

console.log(answer);
