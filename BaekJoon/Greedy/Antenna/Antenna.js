const fs = require("fs");
let [num, arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
arr = arr
  .split(" ")
  .map((el) => +el)
  .sort((a, b) => a - b);
console.log(arr[Math.floor((N - 1) / 2)]);
