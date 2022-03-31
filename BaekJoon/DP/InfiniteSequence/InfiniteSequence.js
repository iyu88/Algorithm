const fs = require("fs");
let [n, p, q] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => +el);

let dp = {};

const getDP = (index) => {
  if (index === "0") return 1;
  if (dp[index] !== undefined) return dp[index];
  dp[index] =
    getDP(Math.floor(index / p).toString()) +
    getDP(Math.floor(index / q).toString());
  return dp[index];
};

console.log(getDP(n.toString()));
