const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim();

let re = new RegExp("^(100+1+|01)+$");
if (input.match(re)) console.log("SUBMARINE");
else console.log("NOISE");
