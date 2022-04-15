const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = [];

while (arr.length) {
  let len = Number(arr.shift());
  let total = 0;
  let temp = arr
    .splice(0, len)
    .map((el) => el.split(" ").map((el2) => +el2))
    .sort((a, b) => a[0] - b[0]);
  let max = temp[0][1];
  for (let i = 0; i < len; i++) {
    if (temp[i][1] <= max) {
      total++;
      max = temp[i][1];
    }
  }
  answer.push(total);
}

console.log(answer.join("\n"));
