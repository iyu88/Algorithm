const fs = require("fs");
let [num, ...temp] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let N = +num;
let index = 0;
let answer = [];

while (index < N * 2) {
  let [len, arr] =
    index + 2 !== N * 2 ? temp.slice(index, index + 2) : temp.slice(index);
  let M = +len;
  let visited = Array(M).fill(false);
  let check = Array(M).fill(false);
  let count = 0;
  let $map = arr.split(" ").map((el) => +el - 1);

  const dfs = (i) => {
    visited[i] = true;
    let next = $map[i];
    if (!visited[next]) dfs(next);
    else {
      if (!check[next]) {
        for (let j = next; i !== j; j = $map[j]) count++;
        count++;
      }
    }
    check[i] = true;
  };

  for (let i = 0; i < len; i++) {
    if (!visited[i]) dfs(i, $map[i]);
  }

  answer.push(M - count);
  index += 2;
}

console.log(answer.join("\n"));
