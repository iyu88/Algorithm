const fs = require("fs");
let S = fs.readFileSync("/dev/stdin").toString().trim().split("");

let stack = [];
let str = "";

for (let i = 0; i < S.length; i++) {
  if (S[i].charCodeAt() >= 65 && S[i].charCodeAt() <= 90) {
    str += S[i];
  } else if (S[i] === "(") {
    stack.push(S[i]);
  } else if (S[i] === ")") {
    while (stack.length && stack[stack.length - 1] !== "(") {
      str += stack.pop();
    }
    stack.pop();
  } else if (S[i] === "+" || S[i] === "-") {
    while (stack.length && stack[stack.length - 1] !== "(") {
      str += stack.pop();
    }
    stack.push(S[i]);
  } else if (S[i] === "*" || S[i] === "/") {
    while (
      stack.length &&
      (stack[stack.length - 1] === "*" || stack[stack.length - 1] === "/")
    ) {
      str += stack.pop();
    }
    stack.push(S[i]);
  }
}

while (stack.length) {
  str += stack.pop();
}

console.log(str);
