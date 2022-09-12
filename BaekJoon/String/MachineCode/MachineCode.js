const fs = require("fs");
let str = fs.readFileSync("/dev/stdin").toString().trim();

let answer = 0;
let regExp = new RegExp("(?=[A-Z])", "g");
let arr = str.split(regExp);
arr.forEach((el, i) => {
  if (i !== arr.length - 1) {
    if (el.length % 4 !== 0) {
      answer += 4 - (el.length % 4);
    }
  }
});

console.log(answer);
