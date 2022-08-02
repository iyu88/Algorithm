const fs = require("fs");
let N = fs.readFileSync("/dev/stdin").toString() * 1;
console.log(parseInt(N.toString(2).split("").reverse().join(""), 2));
