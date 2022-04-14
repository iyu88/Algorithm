const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = [];

while (arr.length) {
  let len = Number(arr.shift());
  let temp = arr
    .shift()
    .split(" ")
    .map((el) => +el);
  let sum = 0;
  let max = temp[len - 1];
  for (let i = len - 2; i > -1; i--) {
    max = Math.max(max, temp[i]);
    if (temp[i] < max) sum += max - temp[i];
  }
  answer.push(sum);
}

console.log(answer.join("\n"));
