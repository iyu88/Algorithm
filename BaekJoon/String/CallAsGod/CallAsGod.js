const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

console.log(
  arr.map((el) => "god" + el.split(" ").slice(1).join("")).join("\n")
);
