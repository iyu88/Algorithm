const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, W, H] = nums.split(" ").map((el) => +el);
let answer = [];
let len = Math.floor(Math.sqrt(W ** 2 + H ** 2));

while (arr.length) {
  Number(arr.shift()) <= len ? answer.push("DA") : answer.push("NE");
}

console.log(answer.join("\n"));
