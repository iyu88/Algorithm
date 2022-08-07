const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

console.log(
  arr
    .map((el) =>
      el
        .split(",")
        .map(Number)
        .reduce((acc, cur) => acc + cur, 0)
    )
    .join("\n")
);
