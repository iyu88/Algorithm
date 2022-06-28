const fs = require("fs");
let num = fs.readFileSync("/dev/stdin").toString() * 1;

let answer = [];
let d = 2;

while (true) {
  if (num % d === 0) {
    answer.push(d);
    num /= d;
    d = 1;
  }
  d++;
  if (d > num) break;
}

console.log(answer.join("\n"));
