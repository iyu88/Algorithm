const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map((el) => +el);
let obj = {};
arr.forEach((el) => {
  if (el.length >= M) {
    if (obj[el] === undefined) obj[el] = 1;
    else obj[el]++;
  }
});

let sorted = Object.keys(obj)
  .sort()
  .sort((a, b) => b.length - a.length)
  .sort((a, b) => obj[b] - obj[a]);
console.log(sorted.join("\n"));
