const fs = require("fs");
let [S, E] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => +el);

let answer = [false, 0];

const bfs = () => {
  let q = [{ v: S, w: 0 }];
  while (q.length) {
    let { v: startV, w: startW } = q.shift();
    if (E === startV) {
      answer[0] = true;
      answer[1] = startW + 1;
      break;
    }
    if (startV * 2 <= E) {
      q.push({ v: startV * 2, w: startW + 1 });
    }
    if (Number(startV.toString() + "1") <= E) {
      q.push({ v: Number(startV.toString() + "1"), w: startW + 1 });
    }
  }
};

bfs();

console.log(answer[0] ? answer[1] : -1);
