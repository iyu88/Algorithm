const fs = require("fs");
let str = fs.readFileSync("/dev/stdin").toString().trim();

let i = 0;
let dict = ["a", "e", "i", "o", "u"];
let answer = [];

while (i < str.length) {
  answer.push(str[i]);
  dict.includes(str[i]) ? (i += 3) : i++;
}

console.log(answer.join(""));
