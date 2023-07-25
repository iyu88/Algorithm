const fs = require("fs");
const str = fs.readFileSync("/dev/stdin").toString().trim().split("");

let count = str.length;
let M = false;

for (let i = 0; i < str.length; i++) {
  const char = str[i];
  const largeCase = char.toUpperCase();

  if (largeCase === char && M === false) {
    M = true;
    count++;
    if (str[i + 1] !== undefined && str[i + 1] === str[i + 1].toLowerCase()) {
      M = false;
    }
  }

  if (largeCase !== char && M === true) {
    M = false;
    count++;
    if (str[i + 1] !== undefined && str[i + 1] === str[i + 1].toUpperCase()) {
      M = true;
    }
  }
}

console.log(count);
