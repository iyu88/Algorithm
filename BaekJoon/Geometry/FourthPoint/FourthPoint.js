const fs = require("fs");
let arr = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map((el2) => +el2));

let answer = [{}, {}];
arr.forEach((el) => {
  el.forEach((el2, i) => {
    answer[i][el2] === undefined ? (answer[i][el2] = 1) : answer[i][el2]++;
  });
});

console.log(
  answer
    .map((el) =>
      Object.keys(el)
        .filter((el2) => el[el2] === 1)
        .join("")
    )
    .join(" ")
);
