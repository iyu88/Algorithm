const fs = require("fs");
let str = fs.readFileSync("/dev/stdin").toString().trim().split("");

let answer = [];
while (str.length) {
  answer.push(str.splice(0, 10).join(""));
}
console.log(answer.join("\n"));
