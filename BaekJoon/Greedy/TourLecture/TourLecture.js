const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = 0;

if (N) {
  arr = arr.map((el) => el.split(" ").map(Number)).sort((a, b) => b[0] - a[0]);
  let max = Math.max(...arr.map((el) => el[0]));
  let visited = Array(max).fill(false);

  for (let i = max; i > 0; i--) {
    for (let j = 0; j < N; j++) {
      let [p, d] = arr[j];
      if (!visited[j] && d >= i) {
        visited[j] = true;
        answer += p;
        break;
      }
    }
  }
}

console.log(answer);
