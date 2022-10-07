const fs = require("fs");
let str = fs.readFileSync("/dev/stdin").toString().split("");

let dict = Array.from("abcdefghijklmnopqrstuvwxyz");

console.log(
  str
    .map((el) => {
      let c = el.toLowerCase();
      let index = dict.findIndex((el) => el === c);
      if (index === -1) return el;
      if (index > 12) {
        let c1 = dict[index - 13];
        if (c !== el) return c1.toUpperCase();
        else return c1;
      } else {
        let c2 = dict[25 - (13 - index) + 1];
        if (c !== el) return c2.toUpperCase();
        else return c2;
      }
    })
    .join("")
);
