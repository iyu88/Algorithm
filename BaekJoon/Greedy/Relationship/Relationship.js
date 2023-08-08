const fs = require("fs");
let [N, K] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const arr = Array(N)
  .fill(1)
  .map((el, idx) => el + idx);
let count = 0;

for (let i = 1; i < N; i++) {
  for (let j = N - 1; j > i - 1; j--) {
    if (count >= K) break;

    [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
    count++;
  }

  if (count >= K) break;
}
console.log(arr.join(" "));
