const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim();

let N = input.length;
let answer = N;

let reversed = input.split("").reverse().join("");

for (let i = 0; i < N; i++) {
  let flag = true;
  for (let j = 0; j < N - i; j++) {
    if (input[i + j] !== reversed[j]) {
      flag = false;
      break;
    }
  }
  if (flag) {
    answer += i;
    break;
  }
}

console.log(answer);
