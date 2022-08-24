const fs = require("fs");
let [target, str] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = 0;
let index = 0;

while (index < target.length) {
  let sliced = target.slice(index, index + str.length);
  if (sliced === str) {
    answer++;
    index += str.length;
  } else {
    index++;
  }
}

console.log(answer);
