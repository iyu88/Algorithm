const fs = require("fs");
let [[N, M], ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map((el2) => +el2));

let answer = 0;
let obj = {};

for (let i = 0; i < arr.length; i++) {
  let [l, p] = arr[i];
  if (obj[l] === undefined) {
    obj[l] = [p];
    answer++;
  } else {
    while (obj[l][obj[l].length - 1] > p) {
      obj[l].pop();
      answer++;
    }
    if (obj[l][obj[l].length - 1] !== p) {
      obj[l].push(p);
      answer++;
    }
  }
}
console.log(answer);
