const fs = require("fs");
let arr = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [];
arr.forEach((el, i) => {
  if (el.includes("FBI")) {
    answer.push(i + 1);
  }
});

if (answer.length) console.log(answer.join(" "));
else console.log("HE GOT AWAY!");
