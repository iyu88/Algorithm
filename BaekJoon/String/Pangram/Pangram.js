const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

console.log(
  arr
    .map((el) => {
      let dict = Array.from("abcdefghijklmnopqrstuvwxyz").reduce(
        (acc, cur) => ({ ...acc, [cur]: 0 }),
        {}
      );
      let pangram = el
        .toLowerCase()
        .split("")
        .map((el2) => {
          if (dict[el2] === 0) dict[el2]++;
        });
      if (Object.values(dict).every((el) => el === 1)) {
        return "pangram";
      } else {
        return (
          "missing " +
          Object.keys(dict)
            .filter((el3) => dict[el3] === 0)
            .join("")
        );
      }
    })
    .join("\n")
);
