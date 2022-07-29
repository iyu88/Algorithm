const fs = require("fs");
let N = fs.readFileSync("/dev/stdin").toString() * 1;

let sum = 1;
let i = 1;
while (sum <= N) {
  sum += ++i;
}
console.log(i - 1);
