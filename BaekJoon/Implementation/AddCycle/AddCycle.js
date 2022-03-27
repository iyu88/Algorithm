const fs = require("fs");
let num = fs.readFileSync("/dev/stdin").toString() * 1;

let N = num;
let sum;
let i = 0;

while (1) {
  i++;
  sum = Math.floor(N / 10) + (N % 10);
  N = (N % 10) * 10 + (sum % 10);

  if (num === N) break;
}

console.log(i);
