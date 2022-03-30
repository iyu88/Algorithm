const fs = require("fs");
let num = fs.readFileSync("/dev/stdin").toString().trim();

let answer = "";

while (num.length > 2) {
  answer = parseInt(num.slice(num.length - 3), 2).toString(8) + answer;
  num = num.slice(0, num.length - 3);
}

console.log(num ? (answer = parseInt(num, 2).toString(8) + answer) : answer);
