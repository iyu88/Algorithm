const fs = require("fs");
let num = fs.readFileSync("/dev/stdin").toString() * 1;

let answer = [];
let visited = Array(num).fill(false);

const backTracking = (i) => {
  if (visited.every((el) => el !== false))
    answer.push(visited.slice(0).join(" "));
  else {
    for (let j = 1; j <= num; j++) {
      if (visited[i]) continue;
      visited[i] = j;
      let isDiff = true;
      for (let k = 0; k < i; k++) {
        if (visited[k] === visited[i]) {
          isDiff = false;
          break;
        }
      }
      if (isDiff) backTracking(i + 1);
      visited[i] = false;
    }
  }
};

backTracking(0);

console.log(answer.join("\n"));
