const fs = require("fs");
let [num, arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
arr = arr.split(" ").map(Number);
let M = arr.shift();

const gcd = (b, s) => {
  return s === 0 ? b : gcd(s, b % s);
};

let answer = [];
arr.forEach((el) => {
  let d = gcd(M, el);
  answer.push(`${M / d}/${el / d}`);
});

console.log(answer.join("\n"));
