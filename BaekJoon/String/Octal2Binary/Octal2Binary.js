const fs = require("fs");
let num = fs.readFileSync("/dev/stdin").toString().trim().split("");

let answer = "";
num.forEach((el, i) => {
  const octal = parseInt(el, 8);
  let binary = octal.toString(2);
  while (i !== 0 && binary.length < 3) {
    binary = "0" + binary;
  }
  answer += binary;
});
console.log(answer);
