const fs = require("fs");
const N = +fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const arr = N.toString().split("");
const visited = Array(arr.length).fill(false);
const result = [];

const backTracking = (visited, index) => {
  if (visited.every((el) => el !== false))
    result.push(+visited.map((el) => arr[el]).join(""));
  else {
    for (let i = 0; i < arr.length; i++) {
      if (visited[index] !== false) continue;
      visited[index] = i;

      let flag = true;
      for (let j = 0; j < index; j++) {
        if (visited[j] === visited[index]) {
          flag = false;
          break;
        }
      }

      if (flag) backTracking(visited, index + 1);

      visited[index] = false;
    }
  }
};

backTracking(visited, 0);

result.sort((a, b) => a - b);

let answer = 0;

for (let i = 0; i < result.length; i++) {
  if (result[i] > N) {
    answer = result[i];
    break;
  }
}

console.log(answer);
