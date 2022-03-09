const fs = require("fs");
let [N, M] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => BigInt(el));

console.log((N / M).toString() + "\n" + (N % M).toString());
