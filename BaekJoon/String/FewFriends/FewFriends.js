const fs = require("fs");
let [str, target] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

console.log(
  str
    .split("")
    .filter((el) => +el !== Number(el))
    .join("")
    .includes(target)
    ? 1
    : 0
);
