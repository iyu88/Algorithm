const fs = require("fs");
const [nums, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M] = nums.split(" ").map(Number);
const totalLength = inputs.reduce((acc, cur) => acc + cur.length, 0);
let [S, R] = [(M - totalLength) / (N - 1), (M - totalLength) % (N - 1)];
let answer = inputs[0];

for (let i = 1; i < N; i++) {
  const firstChar = inputs[i][0];
  if ((firstChar === firstChar.toLowerCase() && R) || i + R === N) {
    R--;
    answer += "_".repeat(S + 1);
  } else {
    answer += "_".repeat(S);
  }

  answer += inputs[i];
}

console.log(answer);
