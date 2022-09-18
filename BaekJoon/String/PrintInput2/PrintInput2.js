const fs = require("fs");
let str = fs.readFileSync("/dev/stdin").toString();
console.log(str);
