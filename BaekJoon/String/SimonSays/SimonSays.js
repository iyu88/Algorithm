const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

console.log(
  arr
    .filter((el) => el.startsWith("Simon says "))
    .map((el) => el.slice(10))
    .join("\n")
);
