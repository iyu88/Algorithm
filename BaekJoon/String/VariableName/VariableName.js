const fs = require("fs");
let [num, str] = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

let answer = Array(3).fill(null);
let N = +num;
answer[N - 1] = str;

if (N === 2) {
  let vanilla = str.toLowerCase().split("_");
  answer[0] = vanilla
    .flat()
    .map((el, i) => (!i ? el : el[0].toUpperCase() + el.slice(1)))
    .join("");
  answer[2] = answer[0].charAt(0).toUpperCase() + answer[0].slice(1);
} else {
  if (N === 1) {
    answer[2] = str.charAt(0).toUpperCase() + str.slice(1);
  } else if (N === 3) {
    answer[0] = str.charAt(0).toLowerCase() + str.slice(1);
  }
  answer[1] = str
    .split("")
    .map((el, i) => {
      if (!i || el === el.toLowerCase()) return el;
      return `_${el}`;
    })
    .join("")
    .toLowerCase();
}

console.log(answer.join("\n"));
