const fs = require("fs");
let [num, str] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
console.log(
  str.split("").reduce((acc, cur) => acc + (cur.charCodeAt() - 64), 0)
);
