const fs = require("fs");
let [nums, arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map((el) => +el));

let answer = [];
let obj = {};

arr.forEach((el) => {
  if (obj[el] === undefined) obj[el] = 1;
  else obj[el]++;
});

let sorted = Object.keys(obj).sort(
  (a, b) => obj[b] - obj[a] || arr.indexOf(Number(a)) - arr.indexOf(Number(b))
);
let elmts = [];
sorted.forEach((el) => {
  for (let i = 0; i < obj[el]; i++) {
    elmts.push(el);
  }
});

console.log(elmts.join(" "));
