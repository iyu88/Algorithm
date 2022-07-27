const fs = require("fs");
let [num, arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

arr = arr
  .split(" ")
  .map(Number)
  .sort((a, b) => b - a)
  .slice(1)
  .reduce((acc, cur) => acc + cur, 0);
console.log(arr);
