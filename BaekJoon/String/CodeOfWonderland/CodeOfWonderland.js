const fs = require("fs");
console.log(
  fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .slice(0, -1)
    .map((el, i) => {
      let str = "";
      for (let j = 0; j < el.length; j += i + 2) {
        str += el[j];
      }
      return str;
    })
    .join("\n")
);
