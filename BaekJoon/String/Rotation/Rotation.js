const fs = require("fs");
let str = fs.readFileSync("/dev/stdin").toString().trim().split("");

let arr = Array(str.length)
  .fill("1")
  .map((el, i) => BigInt(el + "0".repeat(i)));

console.log(
  str
    .map((el) =>
      arr.reduce((acc, cur) => acc + BigInt(cur) * BigInt(el), BigInt(0))
    )
    .reduce((acc, cur) => acc + BigInt(cur), BigInt(0))
    .toString()
);
