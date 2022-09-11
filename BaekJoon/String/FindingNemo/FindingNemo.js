const fs = require("fs");
let strs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [];
let nemo = new RegExp("nemo", "i");

for (let i = 0; i < strs.length - 1; i++) {
  let hasRegExp = nemo.test(strs[i]);
  answer.push(hasRegExp ? "Found" : "Missing");
}

console.log(answer.join("\n"));
