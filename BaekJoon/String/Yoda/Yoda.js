const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

console.log(
  arr
    .map((el) => {
      let splitted = el.split(" ");
      return [...splitted.slice(2), ...splitted.slice(0, 2)].join(" ");
    })
    .join("\n")
);
