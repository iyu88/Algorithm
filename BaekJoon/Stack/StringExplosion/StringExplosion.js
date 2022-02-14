const fs = require("fs");
let [str, boom] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(""));

let stack = [];
for (let i = 0; i < str.length; i++) {
  stack.push(str[i]);
  let flag = true;
  let len = boom.length - 1;
  let $len = stack.length - 1;
  while (flag && len > -1) {
    if (stack[$len] !== boom[len]) flag = false;
    len--;
    $len--;
  }
  if (flag) stack.splice(stack.length - boom.length, boom.length);
}

console.log(stack.length ? stack.join("") : "FRULA");
