const fs = require("fs");
let [n, m, s] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +n;
let M = +m;
let answer = 0;

for (let i = 1; i < M; i++) {
  let cnt = 0;
  if (s[i - 1] === "I") {
    while (s[i] === "O" && s[i + 1] === "I") {
      i += 2;
      cnt++;
      if (cnt === N) {
        cnt--;
        answer++;
      }
    }
  }
}

console.log(answer);
