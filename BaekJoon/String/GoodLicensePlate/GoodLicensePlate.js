const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let dict = Array.from("abcdefghijklmnopqrstuvwxyz".toUpperCase());

console.log(
  arr
    .map((el) => {
      let [front, back] = el.split("-");
      let sum = front
        .split("")
        .reduce(
          (acc, cur, index) =>
            acc + dict.indexOf(cur) * Math.pow(26, front.length - index - 1),
          0
        );
      return Math.abs(sum - Number(back)) > 100 ? "not nice" : "nice";
    })
    .join("\n")
);
