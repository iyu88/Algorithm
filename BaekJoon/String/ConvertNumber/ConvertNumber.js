const fs = require("fs");
let [N, M] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => +el);

let dict = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

let arr = Array(M - N + 1)
  .fill(N)
  .map((el, i) => el + i);
let obj = {};

arr.forEach(
  (el) =>
    (obj[
      el
        .toString()
        .split("")
        .map((el2) => dict[el2])
        .join(" ")
    ] = el)
);
let sorted = Object.keys(obj).sort();
let mapped = sorted.map((el) => obj[el]);
while (mapped.length) {
  if (mapped.length >= 10) {
    console.log(mapped.splice(0, 10).join(" "));
  } else {
    console.log(mapped.splice(0).join(" "));
  }
}
