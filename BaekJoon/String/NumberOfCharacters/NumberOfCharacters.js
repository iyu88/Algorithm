const fs = require("fs");
console.log(
  fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .slice(0, -1)
    .map((el) => {
      let arr = [];
      el.toLowerCase()
        .split("")
        .forEach((el2) => {
          if (el2.charCodeAt() >= 97 && el2.charCodeAt() <= 122) {
            if (!arr.includes(el2)) arr.push(el2);
          }
        });
      return arr.length;
    })
    .join("\n")
);
