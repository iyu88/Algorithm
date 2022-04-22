const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let answer = 0;
let [N, M] = nums.split(" ").map((el) => +el);
let obj = {};
let S = arr.slice(0, N);
S.forEach((el) => {
  if (!obj[el]) obj[el] = 1;
});

for (let i = N; i < arr.length; i++) {
  obj[arr[i]] ? answer++ : (answer = answer);
}

console.log(answer);
