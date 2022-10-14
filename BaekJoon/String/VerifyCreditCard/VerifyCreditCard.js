const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = arr.map((el) => {
  let str = el.split("").map(Number);
  for (let i = 0; i < str.length; i += 2) {
    let double = str[i] * 2;
    if (double > 9) str[i] = double - 9;
    else str[i] = double;
  }
  if (str.reduce((acc, cur) => acc + cur, 0) % 10 === 0) {
    return "T";
  } else {
    return "F";
  }
});

console.log(answer.join("\n"));
