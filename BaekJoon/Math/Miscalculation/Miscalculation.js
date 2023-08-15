const fs = require("fs");
const [target, result] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const T = eval(target);
const R = +result;
let M = +target[0];

for (let i = 2; i < target.length; i += 2) {
  const operation = target[i - 1];
  const nextNum = +target[i];
  if (operation === "+") {
    M += nextNum;
  } else {
    M *= nextNum;
  }
}

if (R === T && R !== M) console.log("M");
if (R !== T && R === M) console.log("L");
if (R === T && R === M) console.log("U");
if (R !== T && R !== M) console.log("I");
