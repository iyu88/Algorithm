const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = 0;
let cases = arr
  .map((el) => el.split(" ").map(Number))
  .sort((a, b) => b[1] - a[1]);
let days = Array(N).fill(false);

for (let i = Math.max(...cases.map((el) => el[0])); i > 0; i--) {
  for (let j = 0; j < cases.length; j++) {
    let [d, w] = cases[j];
    if (!days[j] && d >= i) {
      days[j] = true;
      answer += w;
      break;
    }
  }
}

console.log(answer);
