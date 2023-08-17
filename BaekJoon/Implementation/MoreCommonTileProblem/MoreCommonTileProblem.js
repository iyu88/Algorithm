const fs = require("fs");
const [nums, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M, K] = nums.split(" ").map(Number);
const T = inputs.map((el) => el.split(""));
const step = Math.floor((N * M) / K ** 2);
let total = 0;

for (let i = 0; i < K; i++) {
  for (let j = 0; j < K; j++) {
    const dict = {};

    for (let n = 0; n < N - K + 1; n += K) {
      for (let m = 0; m < M - K + 1; m += K) {
        const tile = T[i + n][j + m];
        if (dict[tile] === undefined) dict[tile] = 1;
        else dict[tile]++;
      }
    }

    const maxCount = Math.max(...Object.values(dict).map(Number));
    total += step - maxCount;

    const [maxCountChar] = Object.keys(dict).filter(
      (key) => dict[key] === maxCount
    );

    for (let n = 0; n < N - K + 1; n += K) {
      for (let m = 0; m < M - K + 1; m += K) {
        T[i + n][j + m] = maxCountChar;
      }
    }
  }
}

console.log(total);
console.log(T.map((el) => el.join("")).join("\n"));
