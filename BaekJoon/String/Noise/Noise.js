const fs = require("fs");
let [a, b, c] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let A = BigInt(a);
let C = BigInt(c);

if (b === "+") {
  console.log((A + C).toString());
} else {
  console.log((A * C).toString());
}
