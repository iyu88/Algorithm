const fs = require("fs");
console.log(
  fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split(",")
    .map(BigInt)
    .reduce((acc, cur) => acc + cur)
    .toString()
);
