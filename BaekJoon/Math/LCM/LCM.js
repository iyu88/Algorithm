const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [];
const gcd = (b, s) => {
  return s === 0 ? b : gcd(s, b % s);
};

const lcm = (b, s, gcd) => {
  return (b * s) / gcd;
};

while (arr.length) {
  let [a, b] = arr
    .shift()
    .split(" ")
    .map((el) => +el);
  let max = Math.max(a, b);
  let min = Math.min(a, b);
  let value = gcd(max, min);
  answer.push(lcm(max, min, value));
}

console.log(answer.join("\n"));
