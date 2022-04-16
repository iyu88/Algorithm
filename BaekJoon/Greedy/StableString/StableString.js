const fs = require("fs");
let arr = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [];

while (arr.length !== 1) {
  let $str = arr.shift().split("");
  let stack = [];
  let count = 0;
  $str.forEach((el) => {
    if (el === "}" && stack[stack.length - 1] === "{") stack.pop();
    else stack.push(el);
  });

  if (stack.length) {
    stack.forEach((el, i) => {
      if ((!(i % 2) && el !== "{") || (i % 2 && el !== "}")) count++;
    });
  }

  answer.push(count);
}

console.log(answer.map((el, i) => `${i + 1}. ${el}`).join("\n"));
