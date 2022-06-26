const fs = require("fs");
let [N, K] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let arr = Array(N - 1)
  .fill(2)
  .map((el, i) => el + i);

while (true) {
  let prime = arr[0];
  let filtered = arr.filter((el) => el % prime === 0);
  if (filtered.length === K) {
    console.log(filtered[filtered.length - 1]);
    break;
  } else if (filtered.length < K) {
    K -= filtered.length;
    arr = arr.filter((el) => el % prime !== 0);
  } else if (filtered.length > K) {
    filtered.forEach((el, i) => {
      if (i + 1 === K) console.log(el);
    });
    break;
  }
}
