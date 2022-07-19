const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim();
console.log(parseInt(input, 16));
