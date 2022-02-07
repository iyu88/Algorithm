const fs = require("fs");
let [a, b] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => +el);

const calcRate = (a, b) => {
  return Math.floor((b * 100) / a);
};
let originRate = calcRate(a, b);

if (originRate >= 99) {
  console.log(-1);
} else {
  let start = 1;
  let end = a;
  let index;
  let changeRate;
  let answer;

  while (start <= end) {
    index = Math.floor((start + end) / 2);
    changeRate = calcRate(a + index, b + index);
    if (originRate < changeRate) {
      answer = index;
      end = index - 1;
    } else {
      start = index + 1;
    }
  }
  console.log(answer);
}
