const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = [];

while (N) {
  let str = arr[arr.length - N];
  let half = Math.floor(str.length / 2);
  answer.push(str[half - 1] === str[half] ? "Do-it" : "Do-it-Not");
  N--;
}

console.log(answer.join("\n"));
