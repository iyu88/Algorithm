const fs = require("fs");
let [a, b, c] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => +el);

const dNc = (num) => {
  if (num === 1) return BigInt(a) % BigInt(c);
  let v = dNc(Math.floor(num / 2));
  v = v ** BigInt(2);
  if (!(num % 2)) return v % BigInt(c);
  else return (v * BigInt(a)) % BigInt(c);
};

console.log(dNc(b).toString());
