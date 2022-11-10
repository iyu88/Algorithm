const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

console.log(
  arr
    .map((el) => {
      const dict = {};
      dict["b"] = dict["g"] = 0;
      el.toLowerCase()
        .split("")
        .forEach((el2) => {
          if (el2 === "b" || el2 === "g") dict[el2]++;
        });
      const type =
        dict["b"] === dict["g"]
          ? "NEUTRAL"
          : dict["b"] > dict["g"]
          ? "A BADDY"
          : "GOOD";
      return `${el} is ${type}`;
    })
    .join("\n")
);
