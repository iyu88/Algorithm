const fs = require("fs");
let str = fs.readFileSync("/dev/stdin").toString().trim().split("");

let stack = [];

for (let i = 0; i < str.length; i++) {
  let c = str[i];
  if (c === ")" && stack[stack.length - 1] === "(") stack.pop();
  else if (c === "]" && stack[stack.length - 1] === "[") stack.pop();
  else stack.push(c);
}

if (stack.length) {
  console.log(0);
} else {
  stack = [];
  for (let i = 0; i < str.length; i++) {
    let c = str[i];
    if (c === "(") {
      if (str[i - 1] === ")" || str[i - 1] === "]") stack.push("+");
      stack.push("2*", "(");
    }
    if (c === "[") {
      if (str[i - 1] === ")" || str[i - 1] === "]") stack.push("+");
      stack.push("3*", "(");
    }
    if (c === ")") {
      if (str[i - 1] === "(") {
        stack.pop();
        stack.push("1");
      } else stack.push(")");
    }
    if (c === "]") {
      if (str[i - 1] === "[") {
        stack.pop();
        stack.push("1");
      } else stack.push(")");
    }
  }

  console.log(eval(stack.join("")));
}
