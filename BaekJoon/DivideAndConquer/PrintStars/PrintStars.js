const fs = require("fs");
let num = fs.readFileSync("/dev/stdin").toString() * 1;

let $map = Array.from(Array(num), () => Array(num));
const dNc = (xfrom, xto, yfrom, yto, size) => {
  let next = Math.floor(size / 3);
  for (let i = yfrom; i < yto; i++) {
    for (let j = xfrom; j < xto; j++) {
      if (
        yfrom + next <= i &&
        i < yfrom + next * 2 &&
        xfrom + next <= j &&
        j < xfrom + next * 2
      ) {
        $map[i][j] = " ";
      } else {
        $map[i][j] = "*";
      }
    }
  }

  if (next > 0) {
    dNc(xfrom, xfrom + next, yfrom, yfrom + next, next);
    dNc(xfrom + next, xfrom + next * 2, yfrom, yfrom + next, next);
    dNc(xfrom + next * 2, xfrom + next * 3, yfrom, yfrom + next, next);

    dNc(xfrom, xfrom + next, yfrom + next, yfrom + next * 2, next);
    dNc(
      xfrom + next * 2,
      xfrom + next * 3,
      yfrom + next,
      yfrom + next * 2,
      next
    );

    dNc(xfrom, xfrom + next, yfrom + next * 2, yfrom + next * 3, next);
    dNc(
      xfrom + next,
      xfrom + next * 2,
      yfrom + next * 2,
      yfrom + next * 3,
      next
    );
    dNc(
      xfrom + next * 2,
      xfrom + next * 3,
      yfrom + next * 2,
      yfrom + next * 3,
      next
    );
  }
};

dNc(0, num, 0, num, num);
console.log($map.map((el) => el.join("")).join("\n"));
