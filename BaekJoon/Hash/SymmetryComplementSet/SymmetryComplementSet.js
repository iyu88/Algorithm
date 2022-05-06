const fs = require("fs");
let [[N, M], first, second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map((el2) => +el2));

let obj = {};
first.forEach((el) => (obj[el] = 1));
second.forEach((el) => {
  if (obj[el]) obj[el]--;
  else obj[el] = 1;
});

console.log(Object.keys(obj).filter((el) => obj[el] === 1).length);
