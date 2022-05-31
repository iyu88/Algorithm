const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = [];

while (arr.length) {
  let [a, b] = arr
    .shift()
    .split(" ")
    .map((el) => +el);
  let zero = 0;
  for (let i = a; i <= b; i++) {
    i.toString()
      .split("")
      .forEach((el) => {
        if (el === "0") zero++;
      });
  }
  answer.push(zero);
}

console.log(answer.join("\n"));
