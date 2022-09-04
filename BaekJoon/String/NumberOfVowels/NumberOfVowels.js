const fs = require("fs");
console.log(
  fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("")
    .filter((el) => ["a", "e", "i", "o", "u"].includes(el)).length
);
