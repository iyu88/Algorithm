const fs = require("fs");
let str = fs.readFileSync("/dev/stdin").toString().trim().split("");

let arr = "CAMBRIDGE".split("");
console.log(str.map((el) => (arr.includes(el) ? "" : el)).join(""));
