const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const a = BigInt(input[0]);
const b = BigInt(input[1]);

console.log(
  `${(a + b).toString()}\n${(a - b).toString()}\n${(a * b).toString()}`
);
