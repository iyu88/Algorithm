const fs = require("fs");
let arr = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .slice(0, -1);

console.log(
  arr
    .map((el) => {
      while (1) {
        el = el
          .toString()
          .split("")
          .reduce((acc, cur) => Number(acc) + Number(cur), 0)
          .toString();
        if (el.length === 1) break;
      }
      return el;
    })
    .join("\n")
);
