const fs = require("fs");
let N = fs.readFileSync("/dev/stdin").toString().trim().split("");
console.log(N.sort((a, b) => b - a).join(""));
