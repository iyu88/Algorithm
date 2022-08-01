const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = [];
let index = 0;

while (index < arr.length) {
  let stack = [];
  arr[index].split(" ").forEach((el) => stack.push(el));
  index++;
  answer.push(`Case #${index}: ${stack.reverse().join(" ")}`);
}

console.log(answer.join("\n"));
