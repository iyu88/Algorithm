const fs = require("fs");
let [str, target] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

str = str
  .split("")
  .filter((c) => c != c * 1)
  .join("");

if (str.includes(target)) console.log(1);
else console.log(0);
