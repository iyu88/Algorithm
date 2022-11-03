const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

console.log(
  arr
    .map((el) => {
      let [n, rest] = el.split(" ");
      let splited = rest.split("");
      return splited.slice(0, n - 1).join("") + splited.slice(n).join("");
    })
    .join("\n")
);
