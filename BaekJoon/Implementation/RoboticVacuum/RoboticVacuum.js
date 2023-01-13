const fs = require('fs');
const [size, nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = size.split(' ').map(Number);
let [x, y, d] = nums.split(' ').map(Number);
const $map = arr.map(el => el.split(' ').map(Number));
const visited = Array(N).fill(null).map(_ => Array(M).fill(false));
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
let answer = 0;
let visitedCount = 0;

while (1) {
  if (visitedCount === 4) {
    const [rearX, rearY] = [x + dx[(d + 6) % 4], y + dy[(d + 6) % 4]];
    if ($map[rearX][rearY] === 1) break;
    else {
      [x, y] = [rearX, rearY];
      visitedCount = 0;
    }
  }
  
  if (!visited[x][y]) {
    visited[x][y] = true;
    $map[x][y] = 2;
    answer++;
  }

  const [leftX, leftY] = [x + dx[(d + 3) % 4], y + dy[(d + 3) % 4]];
  if ($map[leftX][leftY] === 0) {
    [x, y] = [leftX, leftY]
    visitedCount = 0;
  } else {
    visitedCount++;
  }
  d = (d + 3) % 4;
}

console.log(answer);
