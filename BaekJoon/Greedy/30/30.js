const fs = require("fs");
let N = fs.readFileSync("/dev/stdin").toString().trim().split("").map(Number);

if (!N.includes(0)) console.log(-1);
else {
  let sum = N.reduce((acc, cur) => acc + cur, 0);
  if (sum % 3 === 0) console.log(N.sort((a, b) => b - a).join(""));
  else console.log(-1);
}
