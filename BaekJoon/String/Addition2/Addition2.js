const fs = require("fs");
console.log(
  fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .join("")
    .split(",")
    .map(Number)
    .reduce((acc, cur) => acc + cur)
);
