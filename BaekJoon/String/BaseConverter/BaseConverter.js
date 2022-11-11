const fs = require("fs");
let [m, n] = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

console.log(Number(m).toString(n).toUpperCase());
