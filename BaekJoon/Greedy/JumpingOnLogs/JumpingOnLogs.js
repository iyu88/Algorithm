const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [];
while (arr.length) {
  let N = Number(arr.shift());
  let level = 0;
  let result = Array(N).fill(null);
  let temp = arr
    .shift()
    .split(" ")
    .map((el) => +el)
    .sort((a, b) => a - b);
  for (let i = 0; i < temp.length; i++) {
    if (i % 2) result[Math.floor(i / 2)] = temp[i];
    else result[N - 1 - Math.floor(i / 2)] = temp[i];
  }

  for (let i = 1; i < N; i++) {
    level = Math.max(level, Math.abs(result[i] - result[i - 1]));
  }
  answer.push(level);
}

console.log(answer.join("\n"));
