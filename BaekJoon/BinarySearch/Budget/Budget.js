const fs = require("fs");
let [num, temp, total] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let N = +num;
let T = +total;
let arr = temp.split(" ").map((el) => +el);
let answer = 0;

let sum = arr.reduce((acc, cur) => acc + cur, 0);
let start = 0;
let end = Math.max(...arr);
let index;

while (start <= end) {
  index = Math.floor((start + end) / 2);
  sum = arr.reduce((acc, cur) => {
    if (cur <= index) {
      return acc + cur;
    } else {
      return acc + index;
    }
  }, 0);
  if (sum > T) {
    end = index - 1;
  } else {
    answer = index;
    start = index + 1;
  }
}

console.log(answer);
