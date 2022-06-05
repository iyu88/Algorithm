const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("");

let obj = {};

for (let i = 0; i < input.length; i++) {
  let temp = "";
  for (let j = i; j < input.length; j++) {
    temp += input[j];
    if (obj[temp] === undefined) obj[temp] = 1;
  }
}

console.log(Object.keys(obj).length);
