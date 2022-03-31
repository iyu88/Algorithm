const fs = require("fs");
let str = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("-")
  .map((el) => el.charAt(0))
  .join("");
console.log(str);
