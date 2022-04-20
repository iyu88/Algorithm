const fs = require("fs");
let [num, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => BigInt(el));

let obj = {};
let max = 0;
let answer;
arr.forEach((el) => {
  let str = el.toString();
  if (obj[str] === undefined) obj[str] = 1;
  else obj[str]++;
  if (obj[str] > max) {
    answer = str.toString();
    max = obj[str];
  } else if (obj[str] === max) {
    if (BigInt(answer) - BigInt(str) > BigInt(0)) answer = str.toString();
  }
});

console.log(answer);
