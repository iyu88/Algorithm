const fs = require("fs");
let str = fs.readFileSync("/dev/stdin").toString().trim();
console.log(str === str.split("").reverse().join("") ? 1 : 0);
