const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = [];

while (N--) {
  let M = Number(arr.shift());
  let points = Array(M)
    .fill(null)
    .map((el) => []);
  let result = [];
  let temp, visited, childrens;
  arr.splice(0, M).map((el, i) => {
    let [parent, child] = el.split(" ").map((el) => el - 1);
    if (i !== M - 1) points[child].push(parent);
    else childrens = [parent, child];
  });

  const dfs = (i) => {
    if (!visited[i]) {
      visited[i] = true;
      for (const el of points[i]) {
        temp.push(el);
        dfs(el);
      }
    }
  };

  for (let i = 0; i < 2; i++) {
    visited = Array(M).fill(false);
    temp = [childrens[i]];
    dfs(childrens[i]);
    result.push(temp);
  }

  for (let i = 0; i < result[0].length; i++) {
    if (result[1].includes(result[0][i])) {
      answer.push(result[0][i] + 1);
      break;
    }
  }
}

console.log(answer.join("\n"));
