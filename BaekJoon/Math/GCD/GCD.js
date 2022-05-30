const fs = require("fs");
let [a, b] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(":")
  .map((el) => +el);

const gcd = (b, s) => {
  return s === 0 ? b : gcd(s, b % s);
};

let $gcd = gcd(a, b);

console.log(`${a / $gcd}:${b / $gcd}`);
