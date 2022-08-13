const fs = require("fs");
let [num, arr, loc] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let N = +num;
let visited = Array(N).fill(false);
arr = arr.split(" ").map(Number);
let L = +loc;
let di = [-1, 1];

const dfs = (i) => {
  let value = arr[i];
  for (let k = 0; k < 2; k++) {
    let dii = di[k] * value + i;
    if (dii > -1 && dii < N && !visited[dii]) {
      visited[dii] = true;
      dfs(dii);
    }
  }
};

visited[L - 1] = true;
dfs(L - 1);

console.log(visited.filter((el) => el === true).length);
