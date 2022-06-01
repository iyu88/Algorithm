const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("");

let stack = [];

input.forEach((el, i) => {
  if (el === ")" && stack[stack.length - 1] === "(") stack.pop();
  else stack.push(el);
});

console.log(stack.length);
