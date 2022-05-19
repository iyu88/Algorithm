const fs = require("fs");
let arr = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map((el2) => +el2));

let answer = [];
let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];
let temp;

const dfs = (y, x, str) => {
  if (str.length === 6) {
    if (!answer.includes(str)) answer.push(str);
    return;
  } else {
    for (let k = 0; k < 4; k++) {
      let dyy = dy[k] + y;
      let dxx = dx[k] + x;
      if (dyy > -1 && dyy < 5 && dxx > -1 && dxx < 5) {
        dfs(dyy, dxx, str.toString() + arr[dyy][dxx].toString());
      }
    }
  }
};

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    temp = arr[i][j];
    dfs(i, j, temp);
  }
}

console.log(answer.length);
