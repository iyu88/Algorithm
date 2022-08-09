const fs = require("fs");
let str = fs.readFileSync("/dev/stdin").toString().trim().split("0");

console.log(
  str.map((el) => el.split("").filter((el) => el === "@").length).join(" ")
);
