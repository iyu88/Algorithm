const fs = require("fs");
let arr = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [];

arr.forEach((el, i) => {
  if (i === arr.length - 1) return;
  let t = el[0];
  let s = el.slice(1);
  let count = 0;
  answer.push(
    `${t} ${
      s.split("").filter((el2) => el2.toUpperCase() === t.toUpperCase()).length
    }`
  );
});

console.log(answer.join("\n"));
