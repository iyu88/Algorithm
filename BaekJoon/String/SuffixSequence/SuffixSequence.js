const fs = require("fs");
let str = fs.readFileSync("/dev/stdin").toString().trim();

let result = [];
for (let i = 0; i < str.length; i++) {
  result.push(str.slice(i));
}

console.log(result.sort().join("\n"));
