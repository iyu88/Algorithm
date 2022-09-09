const fs = require("fs");
let [num, str] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const regExp = new RegExp("pPAp", "g");
const count = [...str.matchAll(regExp)].length;

console.log(count);
