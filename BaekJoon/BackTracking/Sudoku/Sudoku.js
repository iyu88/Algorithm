const fs = require("fs");
let arr = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split("").map(Number));

let answer;
let points = [];
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (arr[i][j] === 0) points.push([i, j]);
  }
}

const backTracking = (i) => {
  if (arr.every((el) => el.every((el2) => el2 !== 0))) {
    answer = arr.map((el) => el.slice().join("")).join("\n");
    return;
  } else {
    let [y, x] = points[i];
    for (let j = 1; j < 10; j++) {
      if (answer) return;
      arr[y][x] = j;
      let isDiff = true;
      if (isDiff) {
        for (let k = 0; k < 9; k++) {
          if ((k !== x && arr[y][k] === j) || (k !== y && arr[k][x] === j)) {
            isDiff = false;
            break;
          }
        }
      }

      if (isDiff) {
        let yStart = Math.floor(y / 3) * 3;
        let xStart = Math.floor(x / 3) * 3;
        for (let m = yStart; m < yStart + 3; m++) {
          for (let n = xStart; n < xStart + 3; n++) {
            if (m === y && n === x) continue;
            if (arr[m][n] === j) {
              isDiff = false;
              break;
            }
          }
          if (!isDiff) break;
        }
      }
      if (isDiff) backTracking(i + 1);
      arr[y][x] = 0;
    }
  }
};

backTracking(0);

console.log(answer);
