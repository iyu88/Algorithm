const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

console.log(
  arr
    .map((el) => (BigInt(el) % BigInt(2) === BigInt(0) ? "even" : "odd"))
    .join("\n")
);
