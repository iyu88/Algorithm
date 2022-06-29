const fs = require("fs");
let [first, second] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [a, b] = first.split(" ").map(Number);
let [c, d] = second.split(" ").map(Number);

const gcd = (b, s) => {
  return s === 0 ? b : gcd(s, b % s);
};

a *= d;
c *= b;
a += c;
b *= d;

let result = gcd(a, b);

console.log(a / result + " " + b / result);
