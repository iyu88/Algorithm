const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

console.log(
  arr
    .map((el) => {
      let [target, clip] = el.split(" ");
      target = target.replaceAll(clip, ".");
      return target
        .split(clip)
        .reduce((acc, cur) => acc + (cur === "." ? 1 : cur.length), 0);
    })
    .join("\n")
);
