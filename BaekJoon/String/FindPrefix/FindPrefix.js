const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map(Number);
let target = arr.splice(0, N);
console.log(arr.filter((el) => target.some((t) => t.startsWith(el))).length);
