const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

console.log(
  arr
    .map((el) => {
      if (el === "P=NP") {
        return "skipped";
      } else {
        return eval(el);
      }
    })
    .join("\n")
);
