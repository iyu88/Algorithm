const fs = require("fs");
let [a, b, c, d] = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

console.log((BigInt(a.concat(b)) + BigInt(c.concat(d))).toString());
