const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [];

const getLength = (x1, y1, x2, y2) =>
  Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

while (arr.length) {
  let lens = [];
  let $case = arr.splice(0, 4);
  for (let i = 0; i < 3; i++) {
    for (let j = i + 1; j < 4; j++) {
      let [x1, y1] = $case[i].split(" ").map((el) => +el);
      let [x2, y2] = $case[j].split(" ").map((el) => +el);
      lens.push(getLength(x1, y1, x2, y2));
    }
  }
  lens.sort((a, b) => a - b);
  if (
    lens[0] === lens[1] &&
    lens[1] === lens[2] &&
    lens[2] === lens[3] &&
    lens[4] === lens[5]
  ) {
    answer.push(1);
  } else {
    answer.push(0);
  }
}

console.log(answer.join("\n"));
