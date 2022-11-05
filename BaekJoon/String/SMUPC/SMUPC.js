const fs = require("fs");
console.log(
  fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("")
    .map((el) =>
      el.repeat(
        el
          .charCodeAt(0)
          .toString()
          .split("")
          .reduce((acc, cur) => acc + Number(cur), 0)
      )
    )
    .join("\n")
);
