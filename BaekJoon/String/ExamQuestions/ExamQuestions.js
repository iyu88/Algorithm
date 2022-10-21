const fs = require("fs");
let str = fs.readFileSync("/dev/stdin").toString().trim();

let regExp;
if (str.includes("A")) {
  regExp = new RegExp("[B|C|D|F]", "g");
  str = str.replaceAll(regExp, "A");
} else if (str.includes("B")) {
  regExp = new RegExp("[C|D|F]", "g");
  str = str.replaceAll(regExp, "B");
} else if (str.includes("C")) {
  regExp = new RegExp("[D|F]", "g");
  str = str.replaceAll(regExp, "C");
} else {
  str = Array(str.length).fill("A").join("");
}

console.log(str);
