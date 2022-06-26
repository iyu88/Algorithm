const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = [];

while (N--) {
  let [N, M] = arr.shift().split(" ").map(Number);
  let $case = arr.splice(0, N).map((el) => el.split(""));
  let visited = Array.from(Array(N), () => Array(M).fill(false));
  let count = 0;
  let dy = [-1, 1, 0, 0];
  let dx = [0, 0, -1, 1];

  const dfs = (y, x) => {
    if (!visited[y][x]) {
      visited[y][x] = true;
      for (let k = 0; k < 4; k++) {
        let dyy = dy[k] + y;
        let dxx = dx[k] + x;
        if (
          dyy > -1 &&
          dyy < N &&
          dxx > -1 &&
          dxx < M &&
          !visited[dyy][dxx] &&
          $case[dyy][dxx] === "#"
        )
          dfs(dyy, dxx);
      }
    }
  };

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (!visited[y][x] && $case[y][x] === "#") {
        count++;
        dfs(y, x);
      }
    }
  }

  answer.push(count);
}

console.log(answer.join("\n"));
