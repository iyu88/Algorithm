const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [];
arr.forEach((el) =>
  answer.push(
    el
      .split(" ")
      .map((el) => el.split("").reverse().join(""))
      .join(" ")
  )
);
console.log(answer.join("\n"));
