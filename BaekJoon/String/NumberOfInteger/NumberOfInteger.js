const fs = require("fs");
console.log(fs.readFileSync("/dev/stdin").toString().trim().split(",").length);
