const fs = require("fs");
let [N, M] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => +el);

let first = 1;
let second = null;
let counts = [0, 1];

for (let i = 2; i < N + 1; i++) {
  counts[i] = counts[i - 1] + counts[i - 2];
}

while (first * counts[N] <= M && second === null) {
  if ((M - first * counts[N]) % counts[N - 1] === 0) {
    second = (M - first * counts[N]) / counts[N - 1];
  } else {
    first++;
  }
}

console.log(first);
console.log(first + second);
