const fs = require("fs");
let str = fs.readFileSync("/dev/stdin").toString().trim().split("");

let count = 0;
while (str.length !== 1) {
  str = str
    .reduce((acc, cur) => acc + Number(cur), 0)
    .toString()
    .split("");
  count++;
}

console.log(count);

if (Number(str[0]) % 3 === 0) {
  console.log("YES");
} else {
  console.log("NO");
}
