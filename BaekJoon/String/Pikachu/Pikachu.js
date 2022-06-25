const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim();
let reg = new RegExp("^(pi|ka|chu)*$", "g");
console.log([...input.matchAll(reg)].length ? "YES" : "NO");
